import { useQuery } from '@tanstack/react-query'
import { fetchThreads } from '../services/ginkAiClient'

export default function useChats() {
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ['threads'],
		queryFn: fetchThreads,
		staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
	})

	return {
		threads: data || [],
		isPending,
		error,
		isFetching,
	}
}
