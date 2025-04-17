import { jwtDecode } from 'jwt-decode'

// Base API URL - can be replaced with actual API URL in the future
const EMAIL = import.meta.env.VITE_API_EMAIL || ''
const PASSWORD = import.meta.env.VITE_API_PASSWORD || ''

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const authToken = localStorage.getItem('ginkAuthToken')

export async function login(
	email: string = EMAIL,
	password: string = PASSWORD): Promise<void> {

	if (authToken) {
		const { exp = 0 } = jwtDecode(authToken)
		const currentTime = Date.now() / 1000

		if (currentTime < exp) {
			return
		}
	}

	const response = await fetch(`${API_BASE_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ user: { email, password } })
	})

	if (!response.ok) {
		throw new Error(`Login failed: ${response.status}`)
	}

	const { token } = await response.json()
	localStorage.setItem('ginkAuthToken', token)
}
