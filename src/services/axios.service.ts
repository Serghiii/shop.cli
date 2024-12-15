import { api, apiAuth } from "../api/axios.interseptors"

export const axiosService = {

    async get(url:string) {
        return await api.get(url)
    },

    async post(url:string, data?:any) {
        return await api.post(url, data)
    }

}

export const axiosAuthService = {

    async get(url:string) {
        return await apiAuth.get(url)
    },

    async post(url:string, data?:any) {
        return await apiAuth.post(url, data)
    }

}