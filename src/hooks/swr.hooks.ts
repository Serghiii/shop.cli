'use client'

import useSWR from 'swr'
import { axiosService } from '../services'

export const useCategories = () => {
	const { data, error, isLoading } = useSWRGet('service/menu')
	return { ...data, error, isLoading }
}

export function useSWRGet(url: string, options?: any) {
	const fetcher = async (url: string) => await axiosService.get(url).then(response => response.data)
	return useSWR(url, fetcher, options)
}

export function useSWRPost(url: string, data?: any, options?: any) {
	const fetcher = async (url: string) => await axiosService.post(url, data).then(response => response.data)
	return useSWR(url, fetcher, options)
}
