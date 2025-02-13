import { Metadata } from 'next'
import { Footer, Header } from '../../../components/general'
import { Locale } from '../../../i18n-config'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const lang = (await params).lang
	const d = await getDictionary(lang)
	return {
		title: d.title,
		description: d.description
	}
}

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='wrapper'>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
