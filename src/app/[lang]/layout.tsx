import { Roboto } from 'next/font/google'
import { AuthProvider, CartProvider, DictionaryProvider, MainProvider } from '../../contexts'
import { Locale } from '../../i18n-config'
import { getSession } from '../../lib/session'
import { getDictionary } from './dictionaries'
import { MuiThemeProvider } from './mui.provider'
import { SWRProvider } from './swr.provider'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto', weight: ['400', '500', '700', '900'] })

export default async function LangLayout({
	children,
	modal,
	params
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; params: Promise<{ lang: Locale }> }>) {
	const dictionary = await getDictionary((await params).lang)

	return (
		<html lang={(await params).lang}>
			<body className={roboto.className}>
				<SWRProvider>
					<MuiThemeProvider>
						<DictionaryProvider dictionary={dictionary}>
							<AuthProvider auth={await getSession()}>
								<CartProvider>
									<MainProvider>
										{children}
										{modal}
									</MainProvider>
								</CartProvider>
							</AuthProvider>
						</DictionaryProvider>
					</MuiThemeProvider>
				</SWRProvider>
			</body>
		</html>
	)
}
