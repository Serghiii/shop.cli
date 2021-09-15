import { useEffect, useRef, useState } from 'react'
import { useCartContext } from '../contexts';

const CartButton: React.FC<any> = props => {
   const cart = useCartContext().cartState[0]

   const [state, setState] = useState(false)

   const actionsCartDropdown = useRef<HTMLDivElement>(null);
   const Show: string = "show";

   const actionsCartMouseEnter = () => {
      actionsCartDropdown.current?.classList.add(Show);
   }

   const actionsCartMouseLeave = () => {
      actionsCartDropdown.current?.classList.remove(Show);
   }

   const productsAmount = () => {
      return cart.reduce((acc: number, curr: any) => (acc = acc + curr.amount), 0)
   }

   useEffect(() => {
      setState(true)
   }, [])

   return (
      <div className="actions__cart" onClick={props.click} onMouseEnter={actionsCartMouseEnter} onMouseLeave={actionsCartMouseLeave}>
         <i className="actions__cart-icon"></i>
         {(state && cart?.length > 0) && <div className="actions__cart-amount">{productsAmount()}</div>}
      </div>
   )
}

export default CartButton