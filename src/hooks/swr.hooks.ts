'use client'
import useSWR from 'swr'
import { fetchService } from '../services'

export const useCategories = () => {
	const { data, error, isLoading } = useSWRGet('service/menu')
	return { ...data, error, isLoading }
}

export function useSWRGet(url: string, options?: any) {
	const fetcher = async (url: string) =>
		await fetchService
			.get(url)
			.then(responce => responce.json())
			.then(data => data)
	return useSWR(url, fetcher, options)
}

export function useSWRPost(url: string, data?: any, options?: any) {
	const fetcher = async (url: string) =>
		await fetchService
			.post(url, data)
			.then(responce => responce.json())
			.then(data => data)
	return useSWR(url, fetcher, options)
}
