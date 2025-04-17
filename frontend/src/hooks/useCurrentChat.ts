import useChats from './useChats';
import useThreadStore from '../store/threadStore';
import { useEffect } from 'react';

export function useCurrentChat({ autoSelect = true } = {}) {
	const { threads, isPending, isFetching, error } = useChats();
	const { currentThreadId, setCurrentThreadId } = useThreadStore();

	useEffect(() => {
		console.log('use Effect useCurrentChat')
		if (
			autoSelect &&
			threads.length > 0 &&
			!currentThreadId
		) {
			setCurrentThreadId(threads[0].id);
		}
	}, [autoSelect, threads, currentThreadId, setCurrentThreadId]);

	const currentThread = threads.find((t) => t.id === currentThreadId) || null;

	return {
		currentThread,
		currentThreadId,
		setCurrentThreadId,
		threads,
		isPending,
		isFetching,
		error,
	};
}
