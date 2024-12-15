'use client'
import { useEffect, useRef, useState } from 'react'
import User from '../../public/icon/profile/user.svg';
import Logout from '../../public/icon/profile/logout.svg';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import Avatar from '@mui/material/Avatar';
import { LogoutAuthAction, useAppDispatch, useAppSelector } from "../redux";
// import { useTranslation } from './translatation';

const ProfileButton: React.FC<any> = props => {
   // const { t, locale } = useTranslation()
   const locale:string = 'uk'
   const auth = useAppSelector((state: any) => state.auth);
   const dispatch = useAppDispatch()
   const [mounted, setMounted] = useState(false);
   const actionsProfileDropdown = useRef<HTMLDivElement>(null);
   const Show: string = "show";

   const fetcher = async (url: string) => await axios.post(url).then(response => response.data)
   const { data }: any = useSWR(auth.user.isLoggedIn ? 'user/profile' : null, fetcher);

   useEffect(() => {
      setMounted(true)
   }, [])

   const profileMouseEnterHandler = () => {
      if (auth.user.isLoggedIn) actionsProfileDropdown.current?.classList.add(Show);
   }

   const profileMouseLeaveHandler = () => {
      if (auth.user.isLoggedIn) actionsProfileDropdown.current?.classList.remove(Show);
   }

   const exitClickHandler = () => {
      dispatch(LogoutAuthAction())
      actionsProfileDropdown.current?.classList.remove(Show);
   }

   const textOverflow = (str: string = '') => {
      if (str.length > 15) {
         str = str.slice(0, 14) + "...";
      }
      return str;
   }

   return (
      <div className="actions__profile" onClick={props.click} onMouseEnter={profileMouseEnterHandler} onMouseLeave={profileMouseLeaveHandler}>
         <div className="actions__profile-wrapper">
            {mounted && auth.user.isLoggedIn ? (
               <div className="avatar">
                  <Avatar
                     alt="Аватар"
                     src={data?.avatar?.trim().length ? data?.avatar.includes('lh3.googleusercontent.com') ? data?.avatar : `${process.env.STATIC_URL}/avatars/${data?.avatar}` : '/icon/profile/avatar-none.svg'}
                     style={{ height: 30, width: 30 }}
                  />
               </div>
            ) : (
               <i className="actions__profile-icon"></i>
            )}
         </div>
         {mounted && auth.user.isLoggedIn ? (
            <p>{/*t('greeting')*/'undefined'}<br />{textOverflow(data?.name)}</p>
         ) : (
            <p>{/*t('greeting')*/'undefined'}<br />{locale == 'ru' ? <span>войдите&nbsp;в&nbsp;кабинет</span> : <span>увійдіть&nbsp;в&nbsp;кабінет</span>}</p>
         )
         }
         <nav ref={actionsProfileDropdown} className="actions__profile-dropdown">
            <ul className="profile-list">
               <li className="profile-item">
                  <Link href="/profile" className="profile-item__link" target="_blank" rel="nofollow">
                     <div className="link__icon" >
                        <Image src={User} alt="" width={13} height={13} />
                     </div>
                     <span className="link__title">{/*t('auth.login.profile.title')*/'undefined'}</span>
                  </Link>
               </li>
               <li className="profile-item">
                  <div className="profile-item__link" onClick={exitClickHandler} >
                     <div className="link__icon" >
                        <Image src={Logout} alt="" width={13} height={13} />
                     </div>
                     <span className="link__title">{/*t('auth.login.profile.exit')*/'undefined'}</span>
                  </div>
               </li>
            </ul>
         </nav>
      </div>
   )
}

export default ProfileButton