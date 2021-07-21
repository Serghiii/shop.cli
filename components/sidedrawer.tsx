import { Language, Logo } from "./index";

const SideDrawer: React.FC<any> = props => {
   return (
      <div className={`side-drawer${props.show ? ' show' : ''}`}>
         <div className="side-drawer-header">
            <Logo />
            <Language mobile={props.show} />
            <div className="side-drawer-registration">
               <i className="side-drawer-registration__icon"></i>
               <span className="side-drawer-registration__login">Вхід</span>
               <span className="side-drawer-registration__register">Реєстрація</span>
            </div>
         </div>
         <div className="side-drawer-main">
         </div>
      </div>
   )
}

export default SideDrawer