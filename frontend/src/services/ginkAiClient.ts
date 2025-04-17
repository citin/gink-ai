import { Thread } from '../types/thread'
import { Message } from '../types/message'

// Base API URL - can be replaced with actual API URL in the future
const API_BASE_URL = 'http://localhost:3000'
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzYzM2MGUyOS03MDQzLTQ4NmMtODZkYi1hZGY0NTRkMzIyYTAiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQ0NzYzODk4LCJleHAiOjE3NDczNTU4OTh9.WX01DES_rC2J6vGFogFAZF0ea5b0T5w1GYD1479_9hc"

// Endpoints

export async function fetchThreads(): Promise<Thread[]> {
	console.log('Fetching threads from API')
	const response = await apiFetch<{ chats: Thread[] }>('/chats')
	return response.chats
}

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

	const response = await fetch(`${API_BASE_URL}${path}`,
		{
			...options,
			headers: {
				...defaultHeaders,
				...options.headers
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
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${AUTH_TOKEN}`
}



