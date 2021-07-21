import { useRef } from 'react'

const CartButton: React.FC<any> = props => {
   const actionsCartDropdown = useRef<HTMLDivElement>(null);
   const Show: string = "show";

   const actionsCartMouseEnter = () => {
      actionsCartDropdown.current?.classList.add(Show);
   }

   const actionsCartMouseLeave = () => {
      actionsCartDropdown.current?.classList.remove(Show);
   }

   return (
      <div className="actions__cart" onClick={props.click} onMouseEnter={actionsCartMouseEnter} onMouseLeave={actionsCartMouseLeave}>
         <i className="actions__cart-icon"></i>
         <div ref={actionsCartDropdown} className="actions__cart-dropdown">
            <p className="cart-dropdown__title">Ваш кошик порожній</p>
            <p className="cart-dropdown__text">Додавайте до кошика товари, що сподобалися</p>
         </div>
      </div>
   )
}

export default CartButton