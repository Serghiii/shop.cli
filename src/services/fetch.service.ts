import { ErrorMessage } from '../lib/types'

const baseURL = process.env.API_URL

interface TOptions {
	callback?: (token: string) => void
	config?: RequestInit
}

async function doFetch(
	method: string,
	url: string,
	data?: any,
	token?: string,
	cookies?: string, // for SSR
	options?: TOptions,
	retry: boolean = false
) {
	const defaultConfig: RequestInit = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(cookies ? { Cookie: cookies } : {}) // for SSR
		},
		...(data ? { body: JSON.stringify(data) } : {}),
		credentials: 'include'
	}
	const config: RequestInit = {
		...defaultConfig,
		...options?.config,
		headers: {
			...defaultConfig.headers,
			...options?.config?.headers
		}
	}
	if (retry && token) {
		options?.callback?.(token)
	}
	const Url = url.includes('://') ? url : `${baseURL}${url.startsWith('/') ? url : '/' + url}`
	let res = await fetch(Url, config)
	if (!res.ok) {
		if (token && res.status == 401 && !retry) {
			res = await doFetch(method, url, data, await fetchService.refreshToken(cookies), cookies, options, true)
		} else {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.messageId)
		}
	}
	return res
}

export const fetchService = {
	async get(url: string, token?: string, cookies?: string, options?: TOptions) {
		return doFetch('GET', url, undefined, token, cookies, options)
	},
	async post(url: string, data?: any, token?: string, cookies?: string, options?: TOptions) {
		return doFetch('POST', url, data, token, cookies, options)
	},
	async put(url: string, data?: any, token?: string, cookies?: string, options?: TOptions) {
		return doFetch('PUT', url, data, token, cookies, options)
	},
	async patch(url: string, data?: any, token?: string, cookies?: string, options?: TOptions) {
		return doFetch('PATCH', url, data, token, cookies, options)
	},
	async refreshToken(cookies?: string): Promise<string | undefined> {
		const config: RequestInit = {
			method: 'POST',
			headers: {
				...(cookies ? { Cookie: cookies } : {}) // for SSR
			},
			credentials: 'include'
		}
		const res = await fetch(`${baseURL}/auth/refresh`, config)
		if (res.ok) {
			return await res.text()
		}
		return undefined
	}
}
