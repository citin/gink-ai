import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchThreads } from '../services/ginkAiClient'
import useThreadStore from '../store/threadStore';

export default function useChats() {
	const { currentThreadId, setCurrentThreadId } = useThreadStore();

	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ['threads'],
		queryFn: fetchThreads,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})

	useEffect(() => {
		if (data && data.length > 0 && !currentThreadId) {
			setCurrentThreadId(data[0].id);
		}
	}, [currentThreadId, setCurrentThreadId, data])

	return {
		threads: data ?? [],
		currentThreadId,
		isPending,
		error,
		isFetching,
	}
}
