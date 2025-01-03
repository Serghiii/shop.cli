import { Roboto } from 'next/font/google'
import { getDictionary } from './dictionaries'
import { Locale } from '../../i18n-config'
import { DictionaryProvider } from '../../contexts'

const inter = Roboto({ subsets: ['latin'], weight: ['400'] })

export default async function LangLayout({
	children,
	modal,
	params
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; params: Promise<{ lang: Locale }> }>) {
	const dictionary = await getDictionary((await params).lang)

	return (
		<html lang={(await params).lang}>
			<body className={inter.className}>
				<DictionaryProvider dictionary={dictionary}>
					{children}
					{modal}
				</DictionaryProvider>
			</body>
		</html>
	)
}
