'use client'
import Link from 'next/link'
import { useDictionary } from '../contexts'
import { useParams } from 'next/navigation'
import { i18n } from '../i18n-config'

const CategorySubmenu: React.FC = () => {
	const { d } = useDictionary()
	const { lang } = useParams<{ lang: string }>()
	const t = lang === 'ru' ? 'ru' : 'uk'
	const items = {
		uk: {
			phones: {
				title: 'Телефони',
				content: { smartphones: 'Смартфони', mobiles: 'Мобільні телефони', phones: 'Офісні телефони' }
			},
			acsesuary: {
				title: 'Аксессуари',
				content: {
					chohly: 'Чохли для смартфонів',
					sklo: 'Захисне скло і плівки',
					batarei: 'Портативні батареї',
					navushnyky: 'Навушники',
					akustyka: 'Портативна акустика'
				}
			},
			brendy: {
				title: 'За брендами'
			}
		},
		ru: {
			phones: {
				title: 'Телефоны',
				content: { smartphones: 'Смартфоны', mobiles: 'Мобильные телефоны', phones: 'Офисные телефоны' }
			},
			acsesuary: {
				title: 'Аксессуары',
				content: {
					chohly: 'Чехлы для смартфонов',
					sklo: 'Защитное стекло и пленка',
					batarei: 'Портативные батареи',
					navushnyky: 'Наушники',
					akustyka: 'Портативная акустика'
				}
			},
			brendy: {
				title: 'Бренды'
			}
		}
	}

	return (
		<div className='category-item__link-submenu'>
			<div className='submenu-wraper'>
				<ul className='submenu-list'>
					<li className='submenu-item'>
						<p className='submenu-item__title'>{items[t].phones.title}</p>
					</li>
					<li className='submenu-item'>
						<Link
							href={`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/smartphones`}
							className='submenu-item__link'
						>
							{items[t].phones.content.smartphones}
						</Link>
					</li>
					<li className='submenu-item'>
						<Link
							href={`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/mobiles`}
							className='submenu-item__link'
						>
							{items[t].phones.content.mobiles}
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href={`${lang !== i18n.defaultLocale ? `/${lang}` : ''}/phones`} className='submenu-item__link'>
							{items[t].phones.content.phones}
						</Link>
					</li>
					<li className='submenu-item'>
						<p className='submenu-item__title'>{items[t].acsesuary.title}</p>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							{items[t].acsesuary.content.chohly}
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							{items[t].acsesuary.content.sklo}
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							{items[t].acsesuary.content.batarei}
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							{items[t].acsesuary.content.navushnyky}
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							{items[t].acsesuary.content.akustyka}
						</Link>
					</li>
				</ul>
				<ul className='submenu-list'>
					<li className='submenu-item'>
						<p className='submenu-item__title'>{items[t].brendy.title}</p>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Apple
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Samsung
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Realme
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Xiaomi
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							OnePlus
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							OPPO
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Huawei
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							ZTE
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Vivo
						</Link>
					</li>
					<li className='submenu-item'>
						<Link href='/' className='submenu-item__link'>
							Motorola
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
export default CategorySubmenu
