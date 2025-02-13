import { Metadata } from 'next'
import { MainLogin } from '../../../../components'
import { Locale } from '../../../../i18n-config'
import { getDictionary } from '../../dictionaries'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
	const { lang } = await params
	const d = await getDictionary(lang)
	return {
		title: d.auth.login.title
	}
}

const Login: React.FC = () => {
	return <MainLogin />
}

export default Login
