'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../redux'
import { MainProfile } from '../../../../components'
import { useRouter } from 'next/navigation'
import { useDictionary } from '../../../../contexts'

const Profile: React.FC = () => {
	const [showing, setShowing] = useState(false)
	const auth = useAppSelector((state: any) => state.auth)
	const router = useRouter()
	const { d } = useDictionary()

	useEffect(() => {
		document.title = `${d.auth.login.profile.title}: ${auth.user.name}`
		setShowing(true)
	}, [, d.auth.login.profile.title, auth.user.name])

	if (!showing) return null

	if (showing && !auth.user.isLoggedIn) {
		router.push('/login')
		return <></>
	}

	return <MainProfile />
}

export default Profile
