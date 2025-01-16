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
		return await fetch(`${baseURL}${url.startsWith('/') ? url : '/' + url}`, config)
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
		return await fetch(`${baseURL}${url.startsWith('/') ? url : '/' + url}`, config)
	}
}
