'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { cookieI18nName } from '../../i18n-config'

const Language: React.FC<any> = props => {
	const { lang } = useParams<{ lang: string }>()
	const pathname = usePathname()

	const onClickHandle = (e: React.MouseEvent<HTMLAnchorElement>) => {
		document.cookie = `${cookieI18nName}=${e.currentTarget.lang}; path=/`
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
