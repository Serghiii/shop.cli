import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useMainContext } from '../contexts';
import {
   CartButton, CompareButton, ProfileButton, MenuCategoriesButton, MenuSideDrawerButton, Language,
   Locality, Logo, Phones, Search, SideDrawer
} from './index';

const Header: React.FC = () => {
   const auth = useSelector((state: any) => state.auth);
   const mainCtx = useMainContext();
   const [stateDarawer, setStateDarawer] = useState<boolean>(false);
   const hdTop = useRef<HTMLDivElement>(null);
   const hdBtm = useRef<HTMLDivElement>(null);
   const lg: number = 991.98;
   const paddingTop: string = "top_padding_top";
   const Fixed: string = "btm_fixed";
   const _lock: string = '_lock';
   const Show: string = "show";
   let hdFixed: boolean = false;
   let categoryes: boolean = false;
   let scrollup: boolean = false;
   let lockbody: boolean = false;

   const drawerClickHandler = () => {
      // показ бокової панелі
      let padding: string = '0';
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
         padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px';
      }
      setStateDarawer(!stateDarawer);
      document.body.classList.add(_lock);
      lockbody = true;
      if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding;
   };

   const profileClickHandler = () => {
      // авторизація
      if (auth.isLoggedIn) {

      } else {
         let padding = '0';
         if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
            padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px';
         }
         mainCtx.stateProfile[1](true);
         document.body.classList.add(_lock);
         if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding;
      }
   };

   const cartClickHandler = () => {
      // авторизація
      let padding: string = '0';
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
         padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px';
      }
      mainCtx.stateCart[1](true);
      document.body.classList.add(_lock);
      if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding;
   };

   const menuBackdropClickHandler = () => {
      // приховування бокової панелі
      setStateDarawer(false);
      document.body.removeAttribute('class');
      lockbody = false;
      mainCtx.mainSwiper.current?.removeAttribute('style');
   };

   function showCategoryes(show: boolean) {
      if (show && !categoryes) {
         mainCtx.Categories.current?.classList.add(Show); // показати категорії
         categoryes = show;
      } else
         if (!show && categoryes) {
            mainCtx.Categories.current?.classList.remove(Show); // показати категорії
            categoryes = show;
         }
   }

   const changeWindowSize = () => {
      // блокування екрану
      if (window.innerWidth > lg) {
         showCategoryes(true); // показати категорії
         if (lockbody) {
            document.body.classList.remove(_lock);
            lockbody = false;
         }
      } else {
         showCategoryes(false); // сховати категорії
         if (stateDarawer && !lockbody) {
            document.body.classList.add(_lock);
            lockbody = true;
         }
      }
   }

   function isLargeScreen() {
      let res = true;
      if (window.innerWidth <= lg) {
         res = false;
      }
      return res;
   }

   const scrollWindow = () => {
      // фіксація шапки
      if (!hdFixed && window.pageYOffset > (hdBtm.current?.offsetTop || 0)) { // зафіксувати шапку
         hdBtm.current?.classList.add(Fixed);
         hdFixed = true;
         if (isLargeScreen()) hdTop.current?.classList.add(paddingTop);
      } else if (hdFixed && (window.pageYOffset - (isLargeScreen() ? (hdTop.current?.clientHeight || 0) : 0) <= 0)) { // зняти фіксацію шапки
         hdBtm.current?.classList.remove(Fixed);
         hdFixed = false;
         hdTop.current?.classList.remove(paddingTop);
      }
      // показати/сховати кнопку наверх
      if (!scrollup && hdFixed) {
         mainCtx.scrollUp.current?.classList.add("show");
         scrollup = true;
      } else
         if (scrollup && !hdFixed) {
            mainCtx.scrollUp.current?.classList.remove("show");
            scrollup = false;
         }
   }

   useEffect(() => {
      window.addEventListener("resize", changeWindowSize);
      window.addEventListener("scroll", scrollWindow);
      if (window.innerWidth > lg) {
         showCategoryes(true); // показати категорії
      } else {
         showCategoryes(false); // сховати категорії
      }
      return () => {
         window.removeEventListener("resize", changeWindowSize);
         window.removeEventListener("scroll", scrollWindow);
      };
   });

   return (
      <header>
         <div className="wraper-top">
            <div className="container">
               <div ref={hdTop} className="header-top">
                  <div className="top-left">
                     <Logo />
                     <Phones />
                  </div>
                  <div className="top-right">
                     <Locality />
                     <Language />
                  </div>
               </div>
            </div>
         </div>
         <div ref={hdBtm} className="wraper-btm">
            <div className="container">
               <div className="header-btm">
                  <MenuCategoriesButton />
                  <MenuSideDrawerButton click={drawerClickHandler} />
                  <Logo />
                  <Search />
                  <div className="actions">
                     <ProfileButton click={profileClickHandler} />
                     <CompareButton />
                     <CartButton click={cartClickHandler} />
                  </div>
               </div>
               <SideDrawer show={stateDarawer} />
               <div className={`menu-backdrop${stateDarawer ? " show" : ""}`} onClick={menuBackdropClickHandler}></div>
            </div>
         </div>
      </header>
   )
}

export default Header