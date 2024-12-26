'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../redux'
import { MainLogin } from '../../../../components'
import { useDictionary } from '../../../../contexts'
import { useRouter } from 'next/navigation'

const Login: React.FC = () => {
	const { d } = useDictionary()
	const router = useRouter()
	const [showing, setShowing] = useState(false)
	const auth = useAppSelector((state: any) => state.auth)

	useEffect(() => {
		document.title = d.auth.login.title
		setShowing(true)
	}, [])

	if (!showing) return null

	if (showing && auth.user.isLoggedIn) {
		router.push('/profile')
		return <></>
	}

	return <MainLogin />
}

export default Login
