import { create } from 'zustand'

interface ThreadStore {
	currentThreadId: string
	setCurrentThreadId: (threadId: string) => void
}

const useThreadStore = create<ThreadStore>((set) => ({
	currentThreadId: '',
	setCurrentThreadId: (threadId: string) => set({ currentThreadId: threadId })
}))

export default useThreadStore
