import { useRouter } from "next/router";
import { MainLogin, SimpleLayout } from "../components"
import { useAuthContext } from "../contexts";
import { translate } from "../locales/translate";

const Login: React.FC = () => {
   const authCtx = useAuthContext().authState[0];
   const router = useRouter();

   if (typeof window !== 'undefined' && authCtx.isLoggedIn) {
      router.push('/profile');
      return (<></>)
   }

   return (
      <SimpleLayout title={translate('auth.login.title', router.locale)} footer={false} >
         <MainLogin />
      </SimpleLayout >
   )
}
export default Login
