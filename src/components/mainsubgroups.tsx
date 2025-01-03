'use client'
import { MainBreadcrumbs, MainFilters, MainProducts } from '.'
import { useEffect, useState } from 'react'
import { axiosService, pageService } from '../services'
import { useDictionary } from '../contexts'
import { useParams } from 'next/navigation'
import { i18n } from '../i18n-config'

const MainSubgroups: React.FC<any> = ({ group, params, data, pg }) => {
	const [filters, setFilters] = useState<string[]>(params)
	const [page, setPage] = useState<number>(pg)
	const { lang } = useParams<{ lang: string }>()
	const { d } = useDictionary()
	const getParams = (Ids: string[]) => {
		let res: string[] = []
		if (Ids.length) {
			axiosService.post('/propdetail/ids/', { data: Ids }).then(({ data }) => {
				data.forEach((el: any) => {
					res.push(el.id)
				})
				setFilters(res)
			})
		}
	}

	useEffect(() => {
		getParams(params)
	}, [, params])

	useEffect(() => {
		window.history.replaceState(
			'',
			'',
			`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/${group}${
				filters.length ? '/' : ''
			}${pageService.arrToParams(filters, '/')}${page > 1 ? `/page_${page}` : ''}`
		)
	}, [filters, page, lang, group])

	return (
		<>
			{data && (
				<div className='container'>
					<div className='main'>
						<div className='breadcrumbs'>
							<MainBreadcrumbs />
						</div>
						<h2 className='main-title'>{d.filter.group.title}</h2>
						<div className='main-products'>
							<div>
								<section className='filters'>
									<MainFilters
										group={group}
										cond={[filters, setFilters]}
										page={[page, setPage]}
										fdata={data}
									/>
								</section>
							</div>
							<div className='products'>
								<MainProducts group={group} cond={[filters, setFilters]} page={[page, setPage]} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default MainSubgroups
