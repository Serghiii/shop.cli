'use client'
import { setCookie } from 'cookies-next/client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const Language: React.FC<any> = props => {
	const { lang } = useParams<{ lang: string }>()
	const pathname = usePathname()

	const onClick = async (e: any) => {
		let expDate = new Date()
		expDate.setDate(expDate.getDate() + 365)
		setCookie('NEXT_LOCALE', e.target.lang, { expires: new Date(expDate) })
	}

	return (
		<ul className='language'>
			<li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
				{lang === 'ru' ? (
					<span>Рус</span>
				) : (
					<Link href={'/ru' + pathname} lang='ru' onClick={onClick}>
						Рус
					</Link>
				)}
			</li>
			<li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
				{lang === 'uk' ? (
					<span>Укр</span>
				) : (
					<Link href={pathname.substring(3)} lang='uk' onClick={onClick}>
						Укр
					</Link>
				)}
			</li>
		</ul>
	)
}

export default Language
