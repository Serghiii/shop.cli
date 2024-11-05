'use client'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux";
import { MainLogin, SimpleLayout } from "../components";
import { translate } from "../locales/translate";

const Login: React.FC = () => {
   const [showing, setShowing] = useState(false);

   const auth = useAppSelector((state: any) => state.auth)
   const router = useRouter()

   useEffect(() => {
      setShowing(true);
   }, []);

   if (!showing) {
      return null;
   }

   if (showing && auth.user.isLoggedIn) {
      router.push('/profile')
      return (<></>)
   }

   return (
      <SimpleLayout title={translate('auth.login.title', router.locale)} footer={false} >
         <MainLogin />
      </SimpleLayout >
   )
}

export default Login