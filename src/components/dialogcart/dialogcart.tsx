'use client'
import { MouseEvent, useRef } from 'react'
import { useMainContext } from '../../contexts'
// import { translate } from '../../locales/translate'
// import { useRouter } from 'next/router'
import DrawCart from './drawcart'

const DialogCart: React.FC = () => {
   const mainCtx = useMainContext();
   const backdrop = useRef<HTMLDivElement>(null);
   // const { locale } = useRouter()
   const mouseState = {
      Down: false,
      Up: false
   }

   const dialogBackdropMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).contains(backdrop.current)) {
         mouseState.Down = true;
      } else {
         mouseState.Down = false;
      }
   }

   const dialogBackdropMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).contains(backdrop.current)) {
         mouseState.Up = true;
      } else {
         mouseState.Up = false;
      }
   }

   const dialogBackdropClickHandler = (e: MouseEvent<HTMLDivElement>) => {
      if (mouseState.Down && mouseState.Up && (e.target as HTMLElement).contains(backdrop.current)) {
         buttonCloseClickHandler();
      }
   };

   const buttonCloseClickHandler = () => {
      mainCtx.stateCart[1](false);
      document.body.removeAttribute('class');
      mainCtx.mainSwiper.current?.removeAttribute('style');
   }

   return (
      <div ref={backdrop} className={`dialog-wrapper dialog-backdrop${mainCtx.stateCart[0] ? " show" : ""}`} onClick={dialogBackdropClickHandler} onMouseDown={dialogBackdropMouseDownHandler} onMouseUp={dialogBackdropMouseUpHandler}>
         <div className="dialog">
            <div className="dialog-header">
               <h2 className="dialog-header-title">{/*translate('cart.title', locale)*/}</h2>
               <svg className="bt-close" onClick={buttonCloseClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                  <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
               </svg>
            </div>
            <DrawCart closeDialog={buttonCloseClickHandler}/>
         </div>
      </div>
   )
}

export default DialogCart