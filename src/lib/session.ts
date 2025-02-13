import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { decodePayload } from './utils'

export async function getSession() {
	const initialState = { isLoggedIn: false, name: '', avatar: '', token: '' }
	const sessionName = String(process.env.SESSION_NAME)
	const sessionCookies = await cookies()
	if (!sessionCookies.has(sessionName)) return initialState
	const session = sessionCookies.get(sessionName)?.value
	if (!session) return initialState
	const payload = decodePayload((jwtDecode(session) as any).data)
	return { isLoggedIn: true, name: payload.name, avatar: payload.avatar, token: payload.sign }
}

export async function getSessionCookie() {
	const sessionCookies = await cookies()
	const sessionCookie = sessionCookies.get(String(process.env.SESSION_NAME))
	return sessionCookies ? `${sessionCookie?.name}=${sessionCookie?.value}` : undefined
}
