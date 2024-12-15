'use client'
import { reduxService } from '../services';

const CartQuantity: React.FC<any> = () => {
   const cart = reduxService.getCart()

   const productsAmount = () => {
      return cart?.cart?.reduce((acc: number, curr: any) => (acc = acc + curr.iamount), 0)
   }

   return (
      <>
         {(cart?.started && cart?.cart?.length > 0) && <div className="actions__cart-amount">{productsAmount()}</div>}
      </>
   )
}

export default CartQuantity