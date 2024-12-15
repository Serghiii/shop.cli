'use client'
import React from 'react';
import CartQuantity from './cartquantity';

const CartButton: React.FC<any> = props => {
   const actionsCartDropdown = React.useRef<HTMLDivElement>(null);
   const Show: string = "show"

   const actionsCartMouseEnter = () => {
      actionsCartDropdown.current?.classList.add(Show);
   }

   const actionsCartMouseLeave = () => {
      actionsCartDropdown.current?.classList.remove(Show)
   }

   return (
      <div className="actions__cart" onClick={props.click} onMouseEnter={actionsCartMouseEnter} onMouseLeave={actionsCartMouseLeave}>
         <i className="actions__cart-icon"></i>
         <CartQuantity />
      </div>
   )
}

export default CartButton