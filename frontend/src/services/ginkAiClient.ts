import { Thread } from '../types/thread'
import { Message } from '../types/message'
import { authToken, API_BASE_URL } from './auth'

// .../chats

export async function fetchThreads(): Promise<Thread[]> {
	console.log('Fetching threads from API')
	const response = await apiFetch<{ chats: Thread[] }>('/chats')
	return response.chats
}

// .../chats/:id/ask

export async function askThread(threadId: string, content: string): Promise<{ message: Message }> {
	return apiFetch(`/chats/${threadId}/ask`, {
		method: 'POST',
		body: JSON.stringify({ content })
	}) as Promise<{ message: Message }>
}

// General API fetch function
export async function apiFetch<T>(
	path: string,
	options: RequestInit = {}
): Promise<T> {
	// Check if we have an auth token, if not we might need to login first
	if (!authToken) {
		// You may want to redirect to login or handle this case differently
		throw new Error('Authentication required')
	}

	const response = await fetch(`${API_BASE_URL}${path}`,
		{
			...options,
			headers: {
				...defaultHeaders,
				...options.headers,
				'Authorization': `Bearer ${authToken}`
			}
		})

	if (!response.ok) {
		const errorBody = await response.text()
		throw new Error(`API Error ${response.status}: ${errorBody}`)
	}

	return response.json()
}

// Default headers for API requests
const defaultHeaders = {
	'Content-Type': 'application/json'
}



