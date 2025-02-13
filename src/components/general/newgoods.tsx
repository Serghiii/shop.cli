'use client'
import { useDictionary } from '../../contexts'
import { useSWRGet } from '../../hooks'
import { HomeProductCard } from '../general'

const NewGoods: React.FC = () => {
	const { d } = useDictionary()
	const { data } = useSWRGet('products/new/10')

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
