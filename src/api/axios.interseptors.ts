import axios, { CreateAxiosDefaults } from 'axios'

const baseURL = process.env.API_URL

const options: CreateAxiosDefaults = {
	baseURL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const api = axios.create(options)
export const apiAuth = axios.create(options)

let token: string | null = null

apiAuth.interceptors.request.use(async config => {
	if (config?.headers && token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

apiAuth.interceptors.response.use(
	async config => config,
	async error => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			token = await refreshToken()
			if (token) {
				originalRequest.headers.Authorization = `Bearer ${token}`
				return apiAuth(originalRequest)
			}
		}
	}
)

// async function getToken() {
// 		const sessionName = 'session'
// 		const sessionCookies = await cookies()
// 		if (!sessionCookies.has(sessionName)) return ''
// 		const token = sessionCookies.get(sessionName)?.value
// 		if (!token) return ''
// 		const payload = decodePayload((jwtDecode(token) as any).data)
// 		return payload.sign
// }

async function refreshToken() {
	return await apiAuth.post('/auth/refresh').then(res => res.data)
}

export async function setToken(token: string) {
	token = token
}

export async function clearToken() {
	token = null
}
