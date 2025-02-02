import { Metadata } from 'next'
import { MainLogin } from '../../../../components'
import { Locale } from '../../../../i18n-config'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const lang = (await params).lang
	const d = await getDictionary(lang)
	return {
		title: d.auth.login.title
	}
}

const Login: React.FC = () => {
	return <MainLogin />
}

export default Login
