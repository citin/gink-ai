import { useMutation, useQueryClient } from '@tanstack/react-query'
import { askThread } from '../services/ginkAiClient'
import { v4 as uuidv4 } from 'uuid'
import { Thread } from '../types/thread'
import { Message as ApiMessage } from '../types/message'
import useChats from './useChats'
import useCurrentChat from './useCurrentChat'
interface MessageInput {
	threadId: string
	content: string
}

export function useAskChat() {
	const { threads } = useChats()
	const currentThread = useCurrentChat()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ threadId, content }: MessageInput) =>
			askThread(threadId, content),

		onMutate: async ({ content }) => {
			const newMessages = createPendingMessages(content)
			const previousThread = currentThread

			updateThreadsWithNewMessages(newMessages)

			return { previousThread }
		},

		onSuccess: (data) => {
			queryClient.setQueryData(['threads'], (old: Thread[]) => {
				return old.map(thread => {
					if (thread.id !== currentThread?.id) return thread;

					const updatedMessages = [
						// remove the assistant placeholder message
						...thread.messages.slice(0, -1),
						data.message,
					];

					return {
						...thread,
						messages: updatedMessages,
					};
				});
			});
		},

		onError: (_err, { threadId }, context) => {
			if (context?.previousThread) {
				queryClient.setQueryData(['thread', threadId], context.previousThread)
			}
		}
	})

	// Helper functions

	function createPendingMessages(content: string): ApiMessage[] {
		const userMessage: ApiMessage = {
			id: uuidv4(),
			sender: 'user',
			content,
			timestamp: new Date().toISOString(),
			reactions: [],
		}

		const assistantMessage: ApiMessage = {
			id: uuidv4(),
			sender: 'assistant',
			content: 'Thinking...',
			timestamp: new Date().toISOString(),
			reactions: [],
		}

		return [userMessage, assistantMessage]
	}

	function updateThreadsWithNewMessages(newMessages: ApiMessage[]) {
		const updatedThreads = threads.map(thread =>
			thread.id === currentThread?.id
				? {
					...thread,
					messages: [...thread.messages, ...newMessages],
				}
				: thread
		)
		queryClient.setQueryData(['threads'], updatedThreads)
	}
}

export default useAskChat
