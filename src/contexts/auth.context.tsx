'use client'
import { jwtDecode } from 'jwt-decode'
import { createContext, FC, ReactNode, useContext, useReducer } from 'react'
import { ErrorMessage, ErrorStatus } from '../lib/types'
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

const baseURL = process.env.API_URL

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
			const payload = decodePayload((jwtDecode(token) as any).data)
			dispatch({
				type: SessionActionKind.UPDATE,
				payload: { isLoggedIn: true, name: payload.name, avatar: payload.avatar, token }
			})
			return { message: 'Success' }
		} catch (exception: any) {
			return exception
		}
	}

	const logout = async (): Promise<ErrorStatus> => {
		try {
			await post('auth/logout')
			dispatch({ type: SessionActionKind.UPDATE, payload: initialState })
			return { message: 'Success' }
		} catch (exception: any) {
			return exception
		}
	}

	const register = async (data: RegisterUser): Promise<ErrorStatus> => {
		try {
			const res = await (await post('auth/register', data)).json()
			return { message: 'Success', ...res }
		} catch (exception: any) {
			return exception
		}
	}

	const get = async (url: string, retry: boolean = false) => {
		const config: RequestInit = {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${store.session.token}`
			},
			credentials: 'include'
		}
		let res = await fetch(`${baseURL}${url.startsWith('/') ? url : '/' + url}`, config)
		if (!res.ok) {
			if (res.status == 401 && !retry) {
				await refreshToken()
				res = await get(url, true)
			} else {
				const e = JSON.parse(await res.text())
				throw new ErrorMessage(e.message, e.statusCode, e.error)
			}
		}

		return res
	}

	const post = async (url: string, data?: any, retry: boolean = false) => {
		const config: RequestInit = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${store.session.token}`
			},
			body: JSON.stringify(data),
			credentials: 'include'
		}
		let res = await fetch(`${baseURL}${url.startsWith('/') ? url : '/' + url}`, config)
		if (!res.ok) {
			if (res.status == 401 && !retry) {
				await refreshToken()
				res = await post(url, data, true)
			} else {
				const e = JSON.parse(await res.text())
				throw new ErrorMessage(e.message, e.statusCode, e.error)
			}
		}
		return res
	}

	async function refreshToken() {
		const config: RequestInit = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
		const res = await fetch(`${baseURL}/auth/refresh`, config)
		if (res.ok) {
			const token = decodePayload((jwtDecode(await res.json()) as any).data)
			dispatch({
				type: SessionActionKind.UPDATE,
				payload: { ...store.session, token }
			})
		}
	}

	const store: IStore = {
		session: state,
		login,
		logout,
		register,
		get,
		post
	}
	return <AuthContext value={store}>{children}</AuthContext>
}

export const useAuthContext = () => {
	const authContext = useContext(AuthContext)
	if (!authContext) {
		throw new Error('useCartContext must be used within the CartContext.Provider')
	}
	return authContext
}

export default AuthProvider
