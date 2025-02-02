'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { UserAvatar } from '.'
import Logout from '../../public/icon/profile/logout.svg'
import User from '../../public/icon/profile/user.svg'
import { useAuthContext, useDictionary } from '../contexts'

const ProfileButton: React.FC<any> = props => {
	const { d } = useDictionary()
	const ctxAuth = useAuthContext()
	const session = ctxAuth.session
	const actionsProfileDropdown = useRef<HTMLDivElement>(null)
	const Show: string = 'show'

	const profileMouseEnterHandler = () => {
		if (session.isLoggedIn) actionsProfileDropdown.current?.classList.add(Show)
	}

	const profileMouseLeaveHandler = () => {
		if (session.isLoggedIn) actionsProfileDropdown.current?.classList.remove(Show)
	}

	const exitClickHandler = async () => {
		const res = await ctxAuth.logout()
		if (res.message === 'Success') {
			actionsProfileDropdown.current?.classList.remove(Show)
		}
	}

	const textOverflow = (str: string = '') => {
		if (str.length > 15) {
			str = str.slice(0, 14) + '...'
		}
		return str
	}

	return (
		<div
			className='actions__profile'
			onClick={props.click}
			onMouseEnter={profileMouseEnterHandler}
			onMouseLeave={profileMouseLeaveHandler}
		>
			<div className='actions__profile-wrapper'>
				{session.isLoggedIn ? (
					<UserAvatar height={40} width={40} path={session.avatar} />
				) : (
					<i className='actions__profile-icon'></i>
				)}
			</div>
			{session.isLoggedIn ? (
				<p>
					{d.greeting}
					<br />
					{textOverflow(session.name)}
				</p>
			) : (
				<p>
					{d.greeting}
					<br />
					{<span style={{ whiteSpace: 'nowrap' }}>{d.enter_to_cab}</span>}
				</p>
			)}
			<nav ref={actionsProfileDropdown} className='actions__profile-dropdown'>
				<ul className='profile-list'>
					<li className='profile-item'>
						<Link href='/profile' className='profile-item__link' target='_blank' rel='nofollow'>
							<div className='link__icon'>
								<Image src={User} alt='' width={13} height={13} />
							</div>
							<span className='link__title'>{d.auth.login.profile.title}</span>
						</Link>
					</li>
					<li className='profile-item'>
						<div className='profile-item__link' onClick={exitClickHandler}>
							<div className='link__icon'>
								<Image src={Logout} alt='' width={13} height={13} />
							</div>
							<span className='link__title'>{d.auth.login.profile.exit}</span>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default ProfileButton
