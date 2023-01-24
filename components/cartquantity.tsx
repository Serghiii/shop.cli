import React from 'react';
import { GetCartAction, useAppDispatch, useAppSelector } from '../redux';

const CartQuantity: React.FC<any> = () => {
   const cart = useAppSelector((state: any) => state.cart)
   const dispatch = useAppDispatch();

   if (!cart.started) {
      dispatch(GetCartAction(cart))
   }

   const productsAmount = () => {
      return cart.cart.reduce((acc: number, curr: any) => (acc = acc + curr.iamount), 0)
   }

   return (
      <>
         {(cart.started && cart.cart.length > 0) && <div className="actions__cart-amount">{productsAmount()}</div>}
      </>
   )
}

export default CartQuantity