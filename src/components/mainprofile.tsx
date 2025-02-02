'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'
import { ProfileTabs, UserAvatar } from '.'
import Logout from '../../public/icon/profile/logout.svg'
import { useAuthContext, useDictionary } from '../contexts'

const MainProfile: React.FC = () => {
	const { d } = useDictionary()
	const ctxAuth = useAuthContext()
	const session = ctxAuth.session
	const router = useRouter()

	const fetcher = async (url: string) => await ctxAuth.post(url).then(response => response.json())
	const { data } = useSWR('user/profile', fetcher)

	useEffect(() => {
		document.title = `${d.auth.login.profile.title}: ${session.name}`
	}, [, d.auth.login.profile.title])

	useEffect(() => {
		if (!session.isLoggedIn) router.refresh()
	}, [session.isLoggedIn])

	const exitClickHandler = () => {
		ctxAuth.logout()
	}

	return (
		<div className='container-simple'>
			<div className='main-simple-vh'>
				<div className='profile-title-simple'>
					<div className='title-simple-h2'>
						<h2>{d.profile.title}</h2>
					</div>
					<div className='title-simple-avatar-wraper'>
						<div className='title-simple-avatar'>
							<div className='avatar-simple'>
								<UserAvatar className='profile-avatar' height={96} width={96} path={session.avatar} />
							</div>
						</div>
					</div>
					<div className='title-simple-exit-wraper'>
						<div className='title-simple-exit' onClick={exitClickHandler}>
							<div className='link__icon-simple'>
								<Image src={Logout} alt='' width={13} height={13} />
							</div>
							<span className='link__title-simple'>{d.profile.exit}</span>
						</div>
					</div>
				</div>
				<ProfileTabs {...data} />
			</div>
		</div>
	)
}
export default MainProfile
