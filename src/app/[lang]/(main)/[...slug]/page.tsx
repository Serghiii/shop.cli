import { MainGroups, MainProductOne, MainSubgroups } from '../../../../components'

import { notFound } from 'next/navigation'
import { fetchService, pageService } from '../../../../services'

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params

	interface Resault {
		data: any
		page: string
	}
	let res: Resault = {
		data: null,
		page: 'not_found'
	}
	let error: any = null

	if (slug.length == 2 && pageService.isProduct(slug[1])) {
		if (pageService.isProductFormat(slug[1])) {
			try {
				res = await (
					await fetchService.get(`/service/combined/page/${slug[0]}?id=${pageService.extractId(slug[1])}`)
				).json()
			} catch (e: any) {
				error = { message: e.message }
			}
			if (res.page == 'not_found') notFound()
		} else notFound()
	} else {
		if (pageService.isGroupFormat(slug[0])) {
			try {
				res = await (await fetchService.get(`/service/combined/page/${slug[0]}`)).json()
			} catch (e: any) {
				error = { message: e.message }
			}
			if (res.page == 'not_found') notFound()
		} else notFound()
	}

	return (
		<>
			{res.page == 'product' ? (
				<MainProductOne group={slug[0]} data={res.data[0]} />
			) : res.page == 'subgroup' ? (
				<MainSubgroups
					group={slug[0]}
					params={pageService.paramsToArr(slug.slice(1))}
					data={res.data}
					pg={pageService.extractPage(slug)}
				/>
			) : res.page == 'group' ? (
				<MainGroups />
			) : error ? (
				<div>{error.message}</div>
			) : (
				<></>
			)}
		</>
	)
}
