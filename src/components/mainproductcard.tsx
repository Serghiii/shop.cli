'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MoneyFormat } from '.'
import { useCartContext } from '../contexts'
import { i18n } from '../i18n-config'
import { tt } from '../lib/utils'
import { pageService } from '../services'

const MainProductCard: React.FC<any> = ({
	id,
	code,
	name,
	amount,
	price,
	priceold,
	dcount,
	dpercent,
	pic,
	firm,
	group,
	productinfo
}) => {
	const cartItem = useCartContext().cart.find((item: any) => item.id === id)
	const addItem = useCartContext().addItem
	const removeItem = useCartContext().removeItem
	const { lang } = useParams<{ lang: string }>()
	const ref = `${lang !== i18n.defaultLocale ? `/${lang}` : ''}/${group}/${pageService.makeHeadline(id, productinfo)}`

	const onClickHandle = () => {
		if (!cartItem) {
			addItem({ id, code, name, price, priceold, amount_max: amount, pic, amount: 1, dcount, dpercent, firm })
		} else {
			removeItem(id)
		}
	}

	return (
		<div className='main-product-card'>
			<p className='product-card__code'>{`Код: ${code}`}</p>
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
						<MoneyFormat value={priceold} className='old-price-value' currency={false} />
					</div>
				}
				<img
					src={`${process.env.STATIC_URL}/icons/${cartItem ? 'checklist.svg' : 'cart.svg'}`}
					className='product-card__cart-img'
					alt=''
					onClick={onClickHandle}
				/>
			</div>
			<div className='product-card__price'>
				<MoneyFormat value={price} className='price-value' />
			</div>
		</div>
	)
}

export default MainProductCard
