'use client'
import DOMPurify from 'dompurify'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { MainBreadcrumbs, MoneyFormat } from '.'
import { useCartContext, useDictionary } from '../contexts'
import { i18n } from '../i18n-config'
import { tt } from '../lib/utils'
import { axiosService, pageService } from '../services'
import ProductImages from './productimages'

const ProductOne: React.FC<any> = ({ group, data }) => {
	const [extHtml, setExtHtml] = useState({ __html: '' })
	const cartItem = useCartContext().cart.find((item: any) => item.id === data?.id)
	const addItem = useCartContext().addItem
	const { lang } = useParams<{ lang: string }>()
	const { d } = useDictionary()

	const fetcher = async (url: string) =>
		await axiosService.get(url).then(response => {
			setExtHtml({ __html: DOMPurify.sanitize(response.data, { USE_PROFILES: { html: true } }) })
		})
	useSWR(data ? `${process.env.STATIC_URL}/cards/${data?.id}/description/${data?.id}_${lang}.html` : null, fetcher)

	useEffect(() => {
		window.history.replaceState(
			null,
			'',
			`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/${group}/${pageService.makeHeadline(
				data.id,
				data.productinfo
			)}`
		)
	}, [, lang, group, data.id, data.productinfo])

	const onClickHandle = () => {
		if (!cartItem) {
			addItem({
				id: data.id,
				code: data.code,
				name: data.name,
				price: data.price,
				priceold: data.priceold,
				amount_max: data.amount,
				pic: data.pic,
				amount: 1,
				dcount: data.dcount,
				dpercent: data.dpercent,
				firm: data.firmid
			})
		}
	}

	return (
		<div className='container'>
			<div className='main'>
				<div className='breadcrumbs'>
					<MainBreadcrumbs isProduct={true} />
				</div>
				{data && (
					<div className='product-card'>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<ProductImages id={data.id} data={data.productpics} />
							<div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 150px)', width: '100%' }}>
								<div style={{ fontSize: '30px' }}>{tt(data.name, lang)}</div>
								<div
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end'
									}}
								>
									<div style={{ padding: '20px 0', fontWeight: 'bold' }}>Код: {data.code}</div>
									<div className='product-card__price' style={{ paddingBottom: '20px', marginRight: '-5px' }}>
										<MoneyFormat value={data.price} className='price-value' />
									</div>
								</div>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<button className='custom-button-simple' onClick={onClickHandle}>
										{d.bay}
									</button>
								</div>
							</div>
						</div>
						<div dangerouslySetInnerHTML={extHtml} />
					</div>
				)}
			</div>
			<style global jsx>
				{`
					.center-img {
						display: block;
						margin: 0 auto;
					}
				`}
			</style>
		</div>
	)
}

export default ProductOne
