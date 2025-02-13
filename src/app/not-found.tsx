import { cookies } from 'next/headers'
import Image from 'next/image'
import Image404 from '../../public/icon/404.svg'
import { Logo } from '../components/general'
import styles from '../components/styles/not-found.module.scss'
import { cookieI18nName, i18n, Locale } from '../i18n-config'
import { cn } from '../lib/utils'
import { getDictionary } from './[lang]/dictionaries'

export default async function Custom404() {
	const locale = await getLocale()
	const d = await getDictionary(locale as Locale)

	async function getLocale() {
		const langCookies = await cookies()
		if (langCookies.has(cookieI18nName)) {
			let locale = langCookies.get(cookieI18nName)!.value
			if (i18n.locales.some(locale => locale === locale)) return locale
		}
		return i18n.defaultLocale
	}

	const HeaderSimple: React.FC = () => {
		return (
			<header>
				<div className='wraper-top-simple'>
					<div className='container-simple'>
						<div className='header-simple'>
							<div className='top-left'>
								<Logo />
							</div>
							<div className='top-right'>
								<div className='contact-simple'>
									<p>{d.support}</p>
									<a href='tel:+380633821947'>(063) 382-19-47</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		)
	}

	const FooterSimple: React.FC = () => {
		return (
			<footer>
				<div className='wraper-footer-simple'>
					<div className='container-simple'>
						<div className='footer-simple'>
							<p>{d.footer.title}</p>
						</div>
					</div>
				</div>
			</footer>
		)
	}

	return (
		<html>
			<body>
				<HeaderSimple />
				<div className='container-simple'>
					<div className={cn('main-simple', styles['no-borders'])}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								height: '100%',
								margin: '0'
							}}
						>
							<Image className={styles.image} src={Image404} alt='' priority={true} />
							<h2 className={styles.paragraf}>{d[404].not_found}</h2>
						</div>
					</div>
				</div>
				<FooterSimple />
			</body>
		</html>
	)
}
