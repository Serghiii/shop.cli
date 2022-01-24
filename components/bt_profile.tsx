import React, { useEffect, useRef, useState } from 'react'
import User from '../public/icon/profile/user.svg';
import Logout from '../public/icon/profile/logout.svg';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import Avatar from '@mui/material/Avatar';
import { translate } from '../locales/translate';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LogOutAuthAction } from "../redux";


const ProfileButton: React.FC<any> = props => {
   const { locale } = useRouter()
   const auth = useSelector((state: any) => state.auth);
   const dispatch = useDispatch();
   const [mounted, setMounted] = useState(false);
   const actionsProfileDropdown = useRef<HTMLDivElement>(null);
   const Show: string = "show";

   const fetcher = async (url: string) => await axios.post(url).then(response => response.data)
   const { data }: any = useSWR(auth.isLoggedIn ? 'user/profile' : null, fetcher);

   useEffect(() => {
      setMounted(true)
   }, [])

   const profileMouseEnterHandler = () => {
      if (auth.isLoggedIn) actionsProfileDropdown.current?.classList.add(Show);
   }

   const profileMouseLeaveHandler = () => {
      if (auth.isLoggedIn) actionsProfileDropdown.current?.classList.remove(Show);
   }

   const exitClickHandler = () => {
      dispatch(LogOutAuthAction())
      actionsProfileDropdown.current?.classList.remove(Show);
   }

   const textOverflow = (str: string = '') => {
      if (str.length > 15) {
         str = str.substr(0, 15) + "...";
      }
      return str;
   }

   return (
      <div className="actions__profile" onClick={props.click} onMouseEnter={profileMouseEnterHandler} onMouseLeave={profileMouseLeaveHandler}>
         <div className="actions__profile-wrapper">
            {mounted && auth.isLoggedIn ? (
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
         {mounted && auth.isLoggedIn ? (
            <p>{translate('greeting', locale)}<br />{textOverflow(data?.name)}</p>
         ) : (
            <p>{translate('greeting', locale)}<br />{locale == 'ru' ? <span>войдите&nbsp;в&nbsp;кабинет</span> : <span>увійдіть&nbsp;в&nbsp;кабінет</span>}</p>
         )
         }
         <nav ref={actionsProfileDropdown} className="actions__profile-dropdown">
            <ul className="profile-list">
               <li className="profile-item">
                  <Link href="/profile">
                     <a className="profile-item__link" target="_blank" rel="nofollow">
                        <div className="link__icon" >
                           <Image src={User} alt="" />
                        </div>
                        <span className="link__title">{translate('auth.login.profile.title', locale)}</span>
                     </a>
                  </Link>
               </li>
               <li className="profile-item">
                  <div className="profile-item__link" onClick={exitClickHandler} >
                     <div className="link__icon" >
                        <Image src={Logout} alt="" />
                     </div>
                     <span className="link__title">{translate('auth.login.profile.exit', locale)}</span>
                  </div>
               </li>
            </ul>
         </nav>
      </div>
   )
}
export default ProfileButton