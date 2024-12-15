import { Language, Logo } from "./index";
// import { useTranslation } from "./translatation";

const SideDrawer: React.FC<any> = props => {
   // const { t } = useTranslation()

   return (
      <div className={`side-drawer${props.show ? ' show' : ''}`}>
         <div className="side-drawer-header">
            <Logo />
            <Language mobile={props.show} />
            <div className="side-drawer-registration">
               <i className="side-drawer-registration__icon"></i>
               <span className="side-drawer-registration__login">{/*t('auth.login.title')*/'undefined'}</span>
               <span className="side-drawer-registration__register">{/*t('auth.register.title')*/'undefined'}</span>
            </div>
         </div>
         <div className="side-drawer-main">
         </div>
      </div>
   )
}

export default SideDrawer