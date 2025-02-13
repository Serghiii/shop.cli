'use client'
import { jwtDecode } from 'jwt-decode'
import { createContext, FC, ReactNode, useContext, useReducer } from 'react'
import { ErrorStatus } from '../lib/types'
import { decodePayload } from '../lib/utils'
import { fetchService } from '../services'

interface User {
	name: string
	phone: string
	email: string
	password: string
}

interface RegisterUser extends User {
	activation_on: string
	activation_ref: string
}

interface Login {
	username: string
	password: string
}

interface Session {
	isLoggedIn: boolean
	name: string
	avatar: string
	token: string
}

enum SessionActionKind {
	UPDATE = 'UPDATE'
}

interface SessionAction {
	type: SessionActionKind
	payload: Session | Login | RegisterUser
}

const initialState: Session = {
	isLoggedIn: false,
	name: '',
	avatar: '',
	token: ''
}

const sessionReducer = (state: Session, action: SessionAction) => {
	switch (action.type) {
		case 'UPDATE':
			state = action.payload as Session
			return state
		default:
			return state
	}
}

interface IStore {
	session: Session
	login: (data: Login) => Promise<ErrorStatus>
	logout: () => Promise<ErrorStatus>
	register: (data: RegisterUser) => Promise<ErrorStatus>
	get: (url: string) => Promise<any>
	post: (url: string, data?: any) => Promise<any>
	put: (url: string, data?: any) => Promise<any>
	patch: (url: string, data?: any) => Promise<any>
}

const AuthContext = createContext<IStore | undefined>(undefined)

type Props = {
	auth: Session
	children?: ReactNode
}
const AuthProvider: FC<Props> = ({ auth, children }) => {
	const [state, dispatch] = useReducer(sessionReducer, { ...auth })

	const login = async (data: Login): Promise<ErrorStatus> => {
		try {
			const token = await (await fetchService.post('auth/login', data)).text()
			const payload = await decodePayload(((await jwtDecode(token)) as any).data)
			dispatch({
				type: SessionActionKind.UPDATE,
				payload: { isLoggedIn: true, name: payload.name, avatar: payload.avatar, token }
			})
			return { message: 'Success' }
		} catch (e: any) {
			return e
		}
	}

	const logout = async (): Promise<ErrorStatus> => {
		try {
			await fetchService.post('auth/logout')
			dispatch({ type: SessionActionKind.UPDATE, payload: initialState })
			return { message: 'Success' }
		} catch (e: any) {
			return e
		}
	}

	const register = async (data: RegisterUser): Promise<ErrorStatus> => {
		try {
			await fetchService.post('auth/register', data)
			return { message: 'Success' }
		} catch (e: any) {
			return e
		}
	}

	async function updateSession(token: string) {
		const payload = await decodePayload(((await jwtDecode(token)) as any).data)
		dispatch({
			type: SessionActionKind.UPDATE,
			payload: { isLoggedIn: true, name: payload.name, avatar: payload.avatar, token }
		})
	}

	const options = { callback: updateSession }

	const get = async (url: string) => {
		return await fetchService.get(url, store.session.token, undefined, options)
	}

	const post = async (url: string, data?: any) => {
		return await fetchService.post(url, data, store.session.token, undefined, options)
	}

	const put = async (url: string, data?: any) => {
		return await fetchService.put(url, data, store.session.token, undefined, options)
	}

	const patch = async (url: string, data?: any) => {
		return await fetchService.patch(url, data, store.session.token, undefined, options)
	}

	const store: IStore = {
		session: state,
		login,
		logout,
		register,
		get,
		post,
		put,
		patch
	}

	return <AuthContext value={store}>{children}</AuthContext>
}

export const useAuthContext = () => {
	const authContext = useContext(AuthContext)
	if (!authContext) {
		throw new Error('useAuthContext must be used within the AuthProvider')
	}
	return authContext
}

export default AuthProvider
