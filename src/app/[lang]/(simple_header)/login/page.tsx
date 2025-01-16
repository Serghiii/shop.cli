'use client'
import { useEffect, useState } from 'react'
import { MainLogin } from '../../../../components'
import { useAuthContext, useDictionary } from '../../../../contexts'
import { useRouter } from 'next/navigation'

const Login: React.FC = () => {
	const { d } = useDictionary()
	const router = useRouter()
	const [showing, setShowing] = useState(false)
	const session = useAuthContext().session

	useEffect(() => {
		document.title = d.auth.login.title
		setShowing(true)
	}, [, d.auth.login.title])

	if (!showing) return null

	if (showing && session.isLoggedIn) {
		router.push('/profile')
		return null
	}

	return <MainLogin />
}

export default Login
