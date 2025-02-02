import { ErrorMessage } from '../lib/types'

const baseURL = process.env.API_URL

export const fetchService = {
	async get(url: string) {
		const config: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
		const Url = url.includes('://') ? url : `${baseURL}${url.startsWith('/') ? url : '/' + url}`
		const res = await fetch(Url, config)
		if (!res.ok) {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.messageId)
		}
		return res
	},
	async post(url: string, data?: any) {
		const config: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		}
		const Url = url.includes('://') ? url : `${baseURL}${url.startsWith('/') ? url : '/' + url}`
		const res = await fetch(Url, config)
		if (!res.ok) {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.messageId)
		}
		return res
	},
	async put(url: string, data?: any) {
		const config: RequestInit = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		}
		const Url = url.includes('://') ? url : `${baseURL}${url.startsWith('/') ? url : '/' + url}`
		const res = await fetch(Url, config)
		if (!res.ok) {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.messageId)
		}
		return res
	},
	async patch(url: string, data?: any) {
		const config: RequestInit = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		}
		const Url = url.includes('://') ? url : `${baseURL}${url.startsWith('/') ? url : '/' + url}`
		const res = await fetch(Url, config)
		if (!res.ok) {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.messageId)
		}
		return res
	}
}
