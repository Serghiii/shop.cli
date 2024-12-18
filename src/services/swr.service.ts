'use client'
import useSWR from "swr";
import { axiosService } from "."

export const swrService = {

    useSWRGet (url:string): any {
        const fetcher = async (url: string) => await axiosService.get(url).then(response => response.data);
        return useSWR(url, fetcher)
    },

}
