import { ErrorMessage } from '../lib/types'

const baseURL = process.env.API_URL

export const fetchService = {
	async get(url: string) {
		const config: RequestInit = {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}
		const res = await fetch(`${baseURL}${url.startsWith('/') ? url : '/' + url}`, config)
		if (!res.ok) {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.error)
		}
		return res
	},
	async post(url: string, data?: any) {
		const config: RequestInit = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		}
		const res = await fetch(`${baseURL}${url.startsWith('/') ? url : '/' + url}`, config)
		if (!res.ok) {
			const e = JSON.parse(await res.text())
			throw new ErrorMessage(e.message, e.statusCode, e.error)
		}
		return res
	}
}
