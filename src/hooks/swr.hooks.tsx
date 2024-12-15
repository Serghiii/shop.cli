'use client'
import useSWR from "swr"
import { axiosService } from "../services"

export function useSWRGet (url:string) {
    const fetcher = async (url: string) => await axiosService.get(url).then(response => response.data);
    return useSWR(url, fetcher)
}
