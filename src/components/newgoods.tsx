'use client'
import { HomeProductCard } from '.'
import { useDictionary } from '../contexts'
import { useSWRGet } from '../hooks'

const NewGoods: React.FC = () => {
	const { d } = useDictionary()
	const { data } = useSWRGet('products/new/12')

	return (
		<>
			<h2 className='main-new-goods-title'>{d.goods.title}</h2>
			<div className='main-product-cards'>
				{data?.map((obj: any) => (
					<HomeProductCard key={obj.id} {...obj} />
				))}
			</div>
		</>
	)
}

export default NewGoods
