import axios from 'axios'

const baseURL = process.env.API_URL
const isServer = typeof window === 'undefined'

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const apiAuth = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiAuth.interceptors.request.use(async config => {
    if (isServer) {
        const { cookies } = (await import('next/headers'))
        const token = ( await cookies()).get('auth')?.value
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
    }
    else {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, '$1')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
    }
    return config
})