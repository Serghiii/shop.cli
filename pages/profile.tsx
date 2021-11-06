import { useRouter } from "next/router";
import { useEffect } from "react";
import { MainProfile, SimpleLayout } from "../components"
import { useAuthContext } from "../contexts";
import { translate } from '../locales/translate';

const Profile: React.FC = () => {
   const authCtx = useAuthContext().authState[0];
   const router = useRouter();

   useEffect(() => {
      if (!authCtx.isLoggedIn) router.push('/login');
      // eslint-disable-next-line
   }, [authCtx.isLoggedIn])

   const FullPage = () => {
      return (
         <SimpleLayout title={`${translate('auth.login.profile.title', router.locale)}: ${authCtx.name}`} footer={true} >
            <MainProfile />
         </SimpleLayout >
      )
   }

   if (authCtx.isLoggedIn) return (<>{<FullPage />}</>)

   return (
      <></>
   )
}

export default Profile
