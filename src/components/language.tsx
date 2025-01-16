'use client'
import { setCookie } from 'cookies-next/client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { cookieName } from '../i18n-config'

const Language: React.FC<any> = props => {
	const { lang } = useParams<{ lang: string }>()
	const pathname = usePathname()

	const onClickHandle = (e: React.MouseEvent<HTMLAnchorElement>) => {
		setCookie(cookieName, e.currentTarget.lang)
	}

	return (
		<ul className='language'>
			<li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
				{lang === 'ru' ? (
					<span>Рус</span>
				) : (
					<Link href={'/ru' + pathname} lang={'ru'} onClick={onClickHandle}>
						Рус
					</Link>
				)}
			</li>
			<li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
				{lang === 'ua' || lang === 'uk' ? (
					<span>Укр</span>
				) : (
					<Link href={pathname.length > 3 ? pathname.substring(3) : '/'} lang={'uk'} onClick={onClickHandle}>
						Укр
					</Link>
				)}
			</li>
		</ul>
	)
}

export default Language
