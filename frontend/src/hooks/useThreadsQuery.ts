import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchThreads, toggleThreadFavorite } from '../services/threadsApi'
import { Thread } from '../types/thread'
import { useEffect, useState } from 'react'

/**
 * Custom hook for managing threads data and operations
 */
export const useThreadsQuery = () => {
	const [currentThreadId, setCurrentThreadId] = useState<string | null>(null)
	const queryClient = useQueryClient()

	// Query key for threads
	const threadsKey = ['threads']

	// Fetch all threads
	const {
		data: threads = [],
		isLoading,
		error,
		refetch
	} = useQuery({
		queryKey: threadsKey,
		queryFn: fetchThreads,
		staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
	})

	// Select current thread when threads are loaded
	useEffect(() => {
		if (threads.length > 0 && !currentThreadId) {
			setCurrentThreadId(threads[0].id)
		}
	}, [threads, currentThreadId])

	// Get the current thread from the threads array
	const currentThread = threads.find(thread => thread.id === currentThreadId) || null

	// Mutation for toggling favorite status
	const { mutate: toggleFavorite } = useMutation({
		mutationFn: ({ threadId, isFavourite }: { threadId: string; isFavourite: boolean }) =>
			toggleThreadFavorite(threadId, isFavourite),

		// When the mutation is triggered, update the cache immediately (optimistic update)
		onMutate: async ({ threadId, isFavourite }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: threadsKey })

			// Snapshot the previous threads data
			const previousThreads = queryClient.getQueryData<Thread[]>(threadsKey) || []

			// Create updated threads data with the new favorite status
			const updatedThreads = previousThreads.map(thread =>
				thread.id === threadId ? { ...thread, isFavourite } : thread
			)

			// Update the cache with our optimistic result
			queryClient.setQueryData(threadsKey, updatedThreads)

			// Return the previous threads for potential rollback
			return { previousThreads }
		},

		// If the mutation fails, roll back to the previous state
		onError: (_err, _variables, context) => {
			if (context?.previousThreads) {
				queryClient.setQueryData(threadsKey, context.previousThreads)
			}
		},

		// After the mutation succeeds or fails, don't invalidate the query (rely on our optimistic update)
		onSettled: () => {
			// We're not invalidating the query since we don't want to trigger an immediate refetch
			// This avoids the reversion issue
			// queryClient.invalidateQueries({ queryKey: threadsKey })
		},
	})

	// Function to set the current thread
	const setCurrentThread = (thread: Thread | null) => {
		setCurrentThreadId(thread?.id || null)
	}

	return {
		threads,
		isLoading,
		error,
		currentThread,
		setCurrentThread,
		toggleFavorite,
		refetch
	}
}

export default useThreadsQuery 
