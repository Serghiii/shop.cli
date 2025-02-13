'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import Logout from '../../public/icon/profile/logout.svg'
import { useAuthContext, useDictionary } from '../contexts'
import { ProfileTabs } from './general'
import { UserAvatar } from './ui'

const MainProfile: React.FC<any> = ({ data }) => {
	const { d } = useDictionary()
	const { session, logout } = useAuthContext()

	useEffect(() => {
		if (!session.isLoggedIn) window.location.reload()
	}, [session.isLoggedIn])

	const exitClickHandler = () => {
		logout()
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
