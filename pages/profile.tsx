import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MainProfile, SimpleLayout } from "../components"
import { translate } from '../locales/translate';

const Profile: React.FC = () => {
   const auth = useSelector((state: any) => state.auth);
   const router = useRouter();

   useEffect(() => {
      if (!auth.isLoggedIn) router.push('/login');
      // eslint-disable-next-line
   }, [auth.isLoggedIn])

   const FullPage = () => {
      return (
         <SimpleLayout title={`${translate('auth.login.profile.title', router.locale)}: ${auth.name}`} footer={true} >
            <MainProfile />
         </SimpleLayout >
      )
   }

   if (auth.isLoggedIn) return (<>{<FullPage />}</>)

   return (
      <></>
   )
}

export default Profile
