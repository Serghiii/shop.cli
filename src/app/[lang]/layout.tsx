import { SWRProvider } from './swr-provider'
import { ReduxProvider } from './redux-provider'
import { Roboto } from 'next/font/google'
import './normalize.scss'
import './global.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/thumbs'
import { MuiThemeProvider } from './mui-provider'
import { getDictionary } from './dictionaries'
import { Locale } from '../../i18n-config'
import { DictionaryProvider, MainProvider } from '../../contexts'

const inter = Roboto({ subsets: ['latin'], weight: ['400'] })

export default async function RootLayout({
	children,
	auth,
	params
}: Readonly<{ children: React.ReactNode; auth: React.ReactNode; params: Promise<{ lang: Locale }> }>) {
	const dictionary = await getDictionary((await params).lang)

	return (
		<html lang={(await params).lang}>
			<body className={inter.className}>
				<SWRProvider>
					<ReduxProvider>
						<MuiThemeProvider>
							<DictionaryProvider dictionary={dictionary}>
								<MainProvider>
									{children}
									{auth}
								</MainProvider>
							</DictionaryProvider>
						</MuiThemeProvider>
					</ReduxProvider>
				</SWRProvider>
			</body>
		</html>
	)
}
