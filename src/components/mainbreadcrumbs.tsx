'use client'
import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { memo } from 'react'
import { useCategories } from '../hooks'
import { i18n } from '../i18n-config'
import { tt } from '../lib/utils'

const MainBreadcrumbs: React.FC<any> = ({ isProduct = false }) => {
	const menu = useCategories()
	const { lang } = useParams<{ lang: string }>()
	const { slug } = useParams()

	const getItems = (): any[] => {
		let res: [] = []
		if (slug && typeof slug === 'object' && slug.length > 0) {
			slug.forEach(item => {
				getItem(res, item)
			})
		}
		return res
	}

	function getItem(items: any[], str: string) {
		const subgroup = getSubGroup(str)
		if (subgroup) {
			const group = menu.groups?.find((el: any) => el.id == subgroup.group.id)
			const category = menu.categories?.find((el: any) => el.id == group.category.id)
			items.push({ to: category?.ref, label: tt(category?.name, lang) })
			items.push({ to: group?.ref, label: tt(group?.name, lang) })
			items.push({ to: subgroup?.ref, label: tt(subgroup?.name, lang) })
		} else {
			const group = getGroup(str)
			if (group) {
				const category = menu.categories?.find((el: any) => el.id == group.category.id)
				items.push({ to: category?.ref, label: tt(category?.name, lang) })
				items.push({ to: group?.ref, label: tt(group?.name, lang) })
			} else {
				const category = getCategory(str)
				if (category) items.push({ to: category?.ref, label: tt(category?.name, lang) })
			}
		}
	}

	function getCategory(str: string) {
		return menu.categories?.find((el: any) => el.ref == str)
	}

	function getGroup(str: string) {
		return menu.groups?.find((el: any) => el.ref == str)
	}

	function getSubGroup(str: string) {
		return menu.subgroups?.find((el: any) => el.ref == str)
	}

	return (
		<>
			<Breadcrumbs
				className='breadcrumb-ol'
				aria-label='breadcrumb'
				separator={<NavigateNextIcon fontSize='small' />}
			>
				<Link href={lang !== i18n.defaultLocale ? `/${lang}` : '/'}>
					<HomeIcon />
				</Link>
				{getItems().map((item: any, index: number, arr: any) =>
					index >= arr.length - 1 && isProduct === false ? (
						<Typography color='textPrimary' key={item.to}>
							{item.label}
						</Typography>
					) : (
						<Link key={item.to} href={`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/${item.to}`}>
							{item.label}
						</Link>
					)
				)}
			</Breadcrumbs>
			<style global jsx>
				{`
					.breadcrumb-ol > .MuiBreadcrumbs-ol {
						flex-wrap: nowrap;
					}
					.breadcrumb-ol a {
						white-space: nowrap;
					}
					.breadcrumb-ol .MuiSvgIcon-root {
						width: 22px;
						height: 22px;
					}
				`}
			</style>
		</>
	)
}

export default MainBreadcrumbs
