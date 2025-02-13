'use client'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useDictionary } from '../../contexts'
const Categories = dynamic(
	() =>
		import('./categories').catch(err => {
			// eslint-disable-next-line react/display-name
			return () => <p>{err.message}</p>
		}),
	{ ssr: false }
)

const MenuCategoriesButton: React.FC<any> = () => {
	const { d } = useDictionary()
	const refCategory = useRef<HTMLDivElement | null>(null)

	const onMouseEnterHandle = () => {
		if (refCategory.current?.classList.contains('none')) refCategory.current?.classList.remove('none')
	}

	return (
		<div className='menu-categories' onMouseEnter={onMouseEnterHandle}>
			<div className='categories-title'>
				<i className='burger'></i>
				{d.categories.title}
			</div>
			<Categories show={false} refCategory={refCategory} />
			<div className='menu-backdrop idx'></div>
		</div>
	)
}

export default MenuCategoriesButton
