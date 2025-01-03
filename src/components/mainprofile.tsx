'use client'
import useSWR from 'swr'
import { ProfileTabs } from '.'
import Image from 'next/image'
import Logout from '../../public/icon/profile/logout.svg'
import Avatar from '@mui/material/Avatar'
import { useAppDispatch, LogoutAuthAction } from '../redux'
import { useDictionary } from '../contexts'
import { axiosAuthService } from '../services'

const MainProfile: React.FC = () => {
	const { d } = useDictionary()
	const dispatch = useAppDispatch()

	const fetcher = async (url: string) => await axiosAuthService.post(url).then(response => response.data)
	const { data } = useSWR('user/profile', fetcher)

	const exitClickHandler = () => {
		dispatch(LogoutAuthAction())
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
								<Avatar
									alt='Аватар'
									src={
										data?.avatar?.trim().length
											? data?.avatar.includes('lh3.googleusercontent.com')
												? data?.avatar
												: `${process.env.STATIC_URL}/avatars/${data?.avatar}`
											: '/icon/profile/avatar-none.svg'
									}
									className='profile-avatar'
								/>
								<style global jsx>
									{`
										.MuiAvatar-root.profile-avatar {
											height: 96px;
											width: 96px;
										}
										@media (max-width: 767.98px) {
											.MuiAvatar-root.profile-avatar {
												height: 76px;
												width: 76px;
											}
										}
									`}
								</style>
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
