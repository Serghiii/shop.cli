import axios from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import { LogOutAuthAction, useAuthContext } from '../contexts';
import { ProfileTabs } from './profiletabs';
import Image from 'next/image';
import Logout from '../public/icon/profile/logout.svg'
import Avatar from '@material-ui/core/Avatar';

const MainProfile: React.FC = () => {
   const authCtx = useAuthContext().authState[0];
   const dispatch = useAuthContext().authState[1];
   const router = useRouter();

   const fetcher = async (url: string) => await axios.post(url).then(response => response.data)
   const { data } = useSWR('user/profile', fetcher);

   if (typeof window !== 'undefined' && authCtx.isLoggedIn) {
      document.title = 'Профіль: ' + data?.name;
   }

   const exitClickHandler = () => {
      LogOutAuthAction(dispatch);
   }

   useEffect(() => {
      if (!authCtx.isLoggedIn) router.push('/login');
      // eslint-disable-next-line
   }, [authCtx.isLoggedIn])

   return (
      <main>
         <div className="container-simple">
            <div className="main-simple">
               <div className="profile-title-simple">
                  <div className="title-simple-h2">
                     <h2>Профіль</h2>
                  </div>
                  <div className="title-simple-avatar-wraper">
                     <div className="title-simple-avatar">
                        <div className="avatar-simple">
                           <Avatar
                              alt="Аватар"
                              src={data?.avatar?.trim().length ? `${process.env.STATIC_URL}/avatars/${data?.avatar}` : '/icon/profile/avatar-none.svg'}
                              className="profile-avatar"
                           />
                           <style global jsx>{`
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
                  <div className="title-simple-exit-wraper">
                     <div className="title-simple-exit" onClick={exitClickHandler}>
                        <div className="link__icon-simple">
                           <Image src={Logout} alt="" />
                        </div>
                        <span className="link__title-simple">Вихід</span>
                     </div>
                  </div>
               </div>
               <ProfileTabs {...data} />
            </div>
         </div>
      </main >
   )
}
export default MainProfile