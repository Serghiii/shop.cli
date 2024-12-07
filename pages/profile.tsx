'use client'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux";
import { MainProfile, SimpleLayout } from "../components";
import { translate } from '../locales/translate';

const Profile: React.FC = () => {
   const [showing, setShowing] = useState(false)
   const auth = useAppSelector((state: any) => state.auth)
   const router = useRouter()

   useEffect(() => {
      setShowing(true)
   }, [])

   if (!showing) return null

   if (showing && !auth.user.isLoggedIn) {
      router.push('/login')
      return (<></>)
   }

   return (
      <SimpleLayout title={`${translate('auth.login.profile.title', router.locale)}: ${auth.user.name}`} footer={true} >
         <MainProfile />
      </SimpleLayout >
   )
}

export default Profile
