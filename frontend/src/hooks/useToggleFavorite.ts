import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleFavorite } from '../services/ginkAiClient'
import { Thread } from '../types/thread'
import useChats from './useChats'

export function useTogglefavorite() {
	const { threads } = useChats()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ threadId }: { threadId: string }) =>
			toggleFavorite(threadId),

		onMutate: async ({ threadId }) => {
			const previousThread = threads.find(thread => thread.id === threadId)

			queryClient.setQueryData(['threads'], (old: Thread[]) => {
				return old.map(thread => {
					if (thread.id !== threadId) return thread;

					return {
						...thread,
						isFavorite: !thread.isFavorite
					};
				});
			});

			return { previousThread }
		},
		onError: (_, { threadId }, context) => {
			if (context?.previousThread) {
				queryClient.setQueryData(['threads'], (old: Thread[]) => {
					return old.map(thread => {
						if (thread.id !== threadId) return thread;

						return context.previousThread;
					});
				});
			}
		}
	})
}

export default useTogglefavorite
