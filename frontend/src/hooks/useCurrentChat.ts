import { useMemo } from "react";
import useThreadStore from "../store/threadStore";
import useChats from "./useChats";

export default function useCurrentChat() {
	const { currentThreadId } = useThreadStore();
	const { threads } = useChats();

	return useMemo(() => {
		if (!threads || !currentThreadId) return null;
		return threads.find(thread => thread.id === currentThreadId);
	}, [threads, currentThreadId]);
}
