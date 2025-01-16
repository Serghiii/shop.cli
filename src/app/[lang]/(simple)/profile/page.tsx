'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { MainProfile } from '../../../../components'
import { useAuthContext, useDictionary } from '../../../../contexts'

const Profile: React.FC = () => {
	const session = useAuthContext().session
	const { d } = useDictionary()
	const router = useRouter()

	// if (!session.isLoggedIn) {
	// window.location.reload()
	// router.push('/profile')
	// return <></>
	// }

	useEffect(() => {
		document.title = `${d.auth.login.profile.title}: ${session.name}`
	}, [, d.auth.login.profile.title])

	return <MainProfile />
}

export default Profile
