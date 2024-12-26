'use client'
import { useDictionary } from '../contexts'
import { Categories } from './index'

const MenuCategoriesButton: React.FC = () => {
	const { d } = useDictionary()

	return (
		<div className='menu-categories'>
			<div className='categories-title'>
				<i className='burger'></i>
				{d.categories.title}
			</div>
			<Categories />
			<div className='menu-backdrop idx'></div>
		</div>
	)
}

export default MenuCategoriesButton
