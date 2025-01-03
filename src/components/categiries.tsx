'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCategories } from '../hooks'
import { i18n } from '../i18n-config'
import { tt } from '../lib/utils'

const Categories: React.FC<any> = ({ show, refCategory = null }) => {
	const { lang } = useParams<{ lang: string }>()
	const menu = useCategories()

	const getSubItems: any = (id: string) => {
		const subgroup = menu.subgroups?.filter((el: any) => el.group.id === id)
		return (
			<>
				{subgroup.length > 0 &&
					subgroup.map((item: any) => (
						<li className='submenu-item' key={item.id}>
							<Link
								href={`${lang !== i18n.defaultLocale ? `/${lang}/` : ''}${item.ref}`}
								className='submenu-item__link'
								onClick={closeClickHandler}
							>
								{tt(item.name)}
							</Link>
						</li>
					))}
			</>
		)
	}

	const getItems: any = (id: string) => {
		const group = menu.groups?.filter((el: any) => el.category.id === id)
		return (
			<>
				{group.length > 0 && (
					<div className='category-item__link-submenu'>
						<div className='submenu-wraper'>
							<ul className='submenu-list'>
								{group.map((item: any) => (
									<li className='submenu-item' key={item.id}>
										<p className='submenu-item__title'>{tt(item.name)}</p>
										<ul className='submenu-list-item'>{getSubItems(item.id)}</ul>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</>
		)
	}

	const closeClickHandler = () => {
		refCategory?.current.classList.add('none')
	}

	return (
		<nav ref={refCategory} className={'categories' + (show ? ' show' : '')}>
			<ul className='categories-list'>
				{menu.categories?.map((item: any) => (
					<li key={item.ref} className='category-item'>
						<Link
							href={`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/${item.ref}`}
							className='category-item__link'
							onClick={closeClickHandler}
						>
							<img
								src={`${process.env.STATIC_URL}/categories/${item.pic}`}
								className='link__icon'
								alt={item.name}
							/>
							<span className='link__title'>{tt(item.name, lang)}</span>
							<svg viewBox='0 0 6 9' className='link__arrow'>
								<path d='M0 0.7L3.5 4.4L0 8.4L0.8 9L5 4.4L0.8 0L0 0.7Z' transform='translate(0.994141)'></path>
							</svg>
						</Link>
						{getItems(item.id)}
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Categories
