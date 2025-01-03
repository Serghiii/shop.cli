'use client'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { MainBreadcrumbs, MainGroupCard } from '.'
import { tt } from '../lib/utils'
import { useParams, usePathname } from 'next/navigation'
import { useCategories } from '../hooks'

const MainGroups: React.FC = () => {
	const menu = useCategories()

	const pathname = usePathname()
	const { lang } = useParams<{ lang: string }>()

	const getItems = (): any[] => {
		let res: any[]
		let part: string[] = pathname.split('/')
		const category = getCategory(part[part.length - 1])
		if (category) {
			res = getGroupsByCategoty(category.id)
		} else {
			res = getGroup(part[part.length - 1])
		}
		return res
	}

	function getCategory(ref: string) {
		return menu?.categories?.find((el: any) => el.ref === ref)
	}

	function getGroup(ref: string) {
		return Array(menu?.groups?.find((el: any) => el.ref === ref))
	}

	function getGroupsByCategoty(id: number) {
		return menu?.groups?.filter((el: any) => el.category.id === id)
	}

	function getSubGroupsByGroup(id: number) {
		return menu?.subgroups?.filter((el: any) => el.group.id === id)
	}

	return (
		<>
			<div className='container'>
				<div className='main'>
					<div className='breadcrumbs'>
						<MainBreadcrumbs />
					</div>
					{getItems()?.map((item: any) => (
						<div className='mb-10' key={item?.id}>
							<h2 className='main-title'>{tt(item?.name, lang)}</h2>
							<Container maxWidth='xl'>
								<div style={{ marginTop: '3px', marginBottom: '10px' }}>
									<Grid container spacing={3}>
										{getSubGroupsByGroup(item?.id)?.map((item: any) => (
											<Grid key={item.id}>
												<MainGroupCard item={item} />
											</Grid>
										))}
									</Grid>
								</div>
							</Container>
						</div>
					))}
				</div>
			</div>
			<style jsx>
				{`
					.mb-10 {
						margin-bottom: 10px;
					}
				`}
			</style>
		</>
	)
}

export default MainGroups
