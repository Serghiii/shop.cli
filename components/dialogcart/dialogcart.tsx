import React, { MouseEvent, useRef } from 'react'
import { useMainContext } from '../../contexts';
import { translate } from '../../locales/translate';
import { useRouter } from 'next/router';
import { FullCart } from '.';
import { useAppSelector } from '../../redux';

const DialogCart: React.FC = () => {
   const mainCtx = useMainContext();
   const cartRows = useAppSelector((state: any) => state.cart);
   const backdrop = useRef<HTMLDivElement>(null);
   const { locale } = useRouter()
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

   const EmptyCart = () => {
      return (
         <>
            <div className="centered">
               <div className="dialog-body cart">
                  <div className="empty-cart">
                     <svg fill=" #212c4a" viewBox="0 -31 512.00026 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0" />
                        <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" /><path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
                     </svg>
                     <h2>{translate('cart.empty', locale)}</h2>
                  </div>
               </div>
            </div>
            <style jsx>{`
               .centered {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;
               }
            `}</style>
         </>
      )
   }

   return (
      <div ref={backdrop} className={`dialog-wrapper dialog-backdrop${mainCtx.stateCart[0] ? " show" : ""}`} onClick={dialogBackdropClickHandler} onMouseDown={dialogBackdropMouseDownHandler} onMouseUp={dialogBackdropMouseUpHandler}>
         <div className="dialog">
            <div className="dialog-header">
               <h2 className="dialog-header-title">{translate('cart.title', locale)}</h2>
               <svg className="bt-close" onClick={buttonCloseClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                  <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
               </svg>
            </div>
            {cartRows?.length <= 0 ? <EmptyCart /> : <FullCart />}
         </div>
      </div>
   )
}

export default DialogCart