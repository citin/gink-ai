import { useQuery } from '@tanstack/react-query'
import { fetchThreads } from '../services/threadsApi'
import { Thread } from '../types/thread'
import { useEffect, useState } from 'react'

export const useThreadsQuery = () => {
	const [currentThreadId, setCurrentThreadId] = useState<string | null>(null)

	// Fetch all threads
	const {
		data: threads = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ['threads'],
		queryFn: fetchThreads,
	})

	useEffect(() => {
		if (threads.length > 0 && !currentThreadId) {
			setCurrentThreadId(threads[0].id)
		}
	}, [threads, currentThreadId])

	// Get the current thread from the threads array
	const currentThread = threads.find(thread => thread.id === currentThreadId) || null

	// Function to set the current thread
	const setCurrentThread = (thread: Thread | null) => {
		setCurrentThreadId(thread?.id || null)
	}

	return {
		threads,
		isLoading,
		error,
		currentThread,
		setCurrentThread
	}
}

export default useThreadsQuery 
