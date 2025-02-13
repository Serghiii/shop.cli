'use client'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import React from 'react'
import useSWR from 'swr'
import { fetchService, pageService } from '../services'
import { ProductCard } from './general'

const MainProducts: React.FC<any> = ({ group, cond, page }) => {
	const limit: number = 6
	const url: string = `/products/${group}?skip=${(page[0] - 1) * limit}&limit=${limit}${
		cond[0].length ? '&' + pageService.arrToParams(cond[0]) : ''
	}`

	const fetcher = async (url: string) => {
		return await fetchService
			.get(url)
			.then(responce => responce.json())
			.then(data => {
				if (page[0] > 1 && data.results.length <= 0) page[1](1)
				return data
			})
	}
	const { data, error } = useSWR(url, fetcher)

	const setPage = (e: any, val: any) => {
		page[1](val)
	}

	return (
		<>
			{error && <p>{error.message}</p>}
			{data && (
				<>
					<div className='main-product-cards'>
						{data?.results.map((item: any) => (
							<ProductCard key={item.id} {...item} group={group} />
						))}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Stack spacing={2}>
							{data?.count > 0 && (
								<Pagination
									count={Math.ceil(data ? data.count / limit : 0)}
									page={page[0]}
									shape='rounded'
									onChange={setPage}
								/>
							)}
						</Stack>
					</div>
				</>
			)}
		</>
	)
}

export default MainProducts
