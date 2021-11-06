import { useRouter } from "next/router";
import { Language, Logo } from "./index";
import { translate } from '../locales/translate';

const SideDrawer: React.FC<any> = props => {
   const { locale } = useRouter()

   return (
      <div className={`side-drawer${props.show ? ' show' : ''}`}>
         <div className="side-drawer-header">
            <Logo />
            <Language mobile={props.show} />
            <div className="side-drawer-registration">
               <i className="side-drawer-registration__icon"></i>
               <span className="side-drawer-registration__login">{translate('auth.login.title', locale)}</span>
               <span className="side-drawer-registration__register">{translate('auth.register.title', locale)}</span>
            </div>
         </div>
         <div className="side-drawer-main">
         </div>
      </div>
   )
}

export default SideDrawer