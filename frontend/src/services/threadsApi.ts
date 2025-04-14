import { Thread } from '../types/thread'
import mockThreads from '../mock-data/threads.json'

// Base API URL - can be replaced with actual API URL in the future
// const API_BASE_URL = '/api'

/**
 * Fetch all threads
 * Currently using mock data, but can be replaced with actual API call in the future
 */
export const fetchThreads = async (): Promise<Thread[]> => {
	// Simulate network delay for realistic experience
	await new Promise(resolve => setTimeout(resolve, 500))

	// This is where you would replace with a real API call in the future:
	// const response = await fetch(`/api/threads`)
	// return response.json()

	// For now, return mock data
	return mockThreads as Thread[]
}

/**
 * Fetch a single thread by ID
 */
export const fetchThreadById = async (threadId: string): Promise<Thread | null> => {
	// Simulate network delay
	await new Promise(resolve => setTimeout(resolve, 300))

	// This is where you would replace with a real API call in the future:
	// const response = await fetch(`/api/threads/${threadId}`)
	// return response.json()

	// For now, find in mock data
	const thread = mockThreads.find(t => t.id === threadId) as Thread | undefined
	return thread || null
}

/**
 * Additional API methods can be added here, following the same pattern:
 * - createThread
 * - updateThread
 * - deleteThread
 * - addMessage
 * etc.
 */
