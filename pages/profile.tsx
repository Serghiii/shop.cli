import { useRouter } from "next/router";
import { MainProfile, SimpleLayout } from "../components"
import { useAuthContext } from "../contexts";

const Profile: React.FC = () => {
   const authCtx = useAuthContext().authState[0];
   const router = useRouter();

   if (typeof window !== 'undefined' && !authCtx.isLoggedIn) {
      router.push('/login');
      return (<></>)
   }

   return (
      <SimpleLayout title={`Профіль: ${authCtx.name}`} footer={true} >
         <MainProfile />
      </SimpleLayout >
   )
}
export default Profile
