import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MainLogin, SimpleLayout } from "../components"
import { translate } from "../locales/translate";

const Login: React.FC = () => {
   const auth = useSelector((state: any) => state.auth);
   const router = useRouter();

   if (typeof window !== 'undefined' && auth.isLoggedIn) {
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
