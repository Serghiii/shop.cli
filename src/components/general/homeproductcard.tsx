'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { i18n } from '../../i18n-config'
import { tt } from '../../lib/utils'
import { pageService } from '../../services'
import { MoneyFormat } from '../ui'

const HomeProductCard: React.FC<any> = ({ id, name, price, priceold, pic, subgroup, productinfo }) => {
	const { lang } = useParams<{ lang: string }>()
	const ref = `${lang !== i18n.defaultLocale ? `/${lang}` : ''}/${subgroup.ref}/${pageService.makeHeadline(
		id,
		productinfo
	)}`

	return (
		<div className='main-product-card'>
			<div className='product-card__view'>
				<Link href={ref} className='product-card__ico'>
					<img src={`${process.env.STATIC_URL}/cards/${id}/${pic}`} className='product-card__img' alt='' />
				</Link>
			</div>
			<Link href={ref} className='product-card__name'>
				{tt(name, lang)}
			</Link>
			<div className='product-card__prices'>
				{
					<div className='product-card__price-old'>
						<MoneyFormat {...{ value: priceold, className: 'old-price-value', currency: false }} />
					</div>
				}
				<div className='product-card__price'>
					<MoneyFormat {...{ value: price, className: 'price-value' }} />
				</div>
			</div>
		</div>
	)
}

export default HomeProductCard
