import { Metadata } from 'next'
import { MainProfile } from '../../../../components'
import { Locale } from '../../../../i18n-config'
import { getSession, getSessionCookie } from '../../../../lib/session'
import { fetchService } from '../../../../services'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const lang = (await params).lang
	const d = await getDictionary(lang)
	const session = await getSession()
	return {
		title: `${d.auth.login.profile.title}: ${session.name}`
	}
}

const Profile: React.FC = async () => {
	const res = await fetchService.post('user/profile', undefined, (await getSession()).token, await getSessionCookie())
	return <MainProfile data={await res.json()} />
}

export default Profile
