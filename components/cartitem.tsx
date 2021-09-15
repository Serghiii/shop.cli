import IconButton from "@material-ui/core/IconButton";
import React from "react"
import MoneyFormat from "./money-format"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CartAction, useCartContext } from "../contexts";

const CartItem: React.FC<any> = (item) => {
   const cartRows = useCartContext().cartState[0];
   const dispatch = useCartContext().cartState[1];

   const onChangeCountHandler = (e: any) => {
      if (e.target.value <= 0) e.target.value = 1
      if (e.target.value > item.amount) e.target.value = item.amount
      const val: number = e.target.value
      dispatch({
         type: CartAction.AdjustAmount, payload: { id: item.id, amount: val }
      })
   }

   const onClickHandle = (e: any) => {
      console.log("remove");

      dispatch({
         type: CartAction.RemoveItem, payload: { id: item.id }
      })
   }

   return (
      <>
         <div className="cart-row">
            <div className="cart-row__img-range" >
               <img className="cart-row__img" src={item.id ? `${process.env.STATIC_URL}/cards/${item.id}/${item.pic}` : ''} alt="" />
            </div>
            <div style={{ flex: "1" }}>
               <p>{item.name}</p>
               <p>Код: {item.code}</p>
               <MoneyFormat {...{ value: item.price, className: 'price-value' }} />
            </div>
            <input type="number" style={{ width: "60px", outline: "none", margin: "0 10px 0 10px", padding: "3px" }} min="1" defaultValue={cartRows.find((item2: any) => (item2.id === item.id))?.amount} onChange={onChangeCountHandler} />
            <div>
               <MoneyFormat {...{ value: item.price * cartRows.find((item2: any) => (item2.id === item.id))?.amount, className: 'price-value' }} />
            </div>
            <div>
               <IconButton aria-label="delete" component="span" onClick={onClickHandle}>
                  <DeleteForeverIcon color="action" />
               </IconButton>
            </div>
         </div>
      </>
   )
}

export default CartItem