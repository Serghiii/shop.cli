'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const Language: React.FC<any> = props => {
	const { lang } = useParams<{ lang: string }>()
	const pathname = usePathname()

	return (
		<ul className='language'>
			<li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
				{lang === 'ru' ? <span>Рус</span> : <Link href={'/ru' + pathname}>Рус</Link>}
			</li>
			<li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
				{lang === 'ua' || lang === 'uk' ? (
					<span>Укр</span>
				) : (
					<Link href={pathname.length > 3 ? pathname.substring(3) : '/'}>Укр</Link>
				)}
			</li>
		</ul>
	)
}

export default Language
