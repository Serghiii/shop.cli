import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField"
import React from "react"
import { CartAction, useCartContext } from "../contexts/cart-context";
import MoneyFormat from "./money-format"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const CartItem: React.FC<any> = (item: any) => {
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
      dispatch({
         type: CartAction.RemoveItem, payload: { id: item.id }
      })
   }

   return (
      <>
         <div className="cart-row" key={item.id}>
            <div className="cart-row__img-range" >
               <img className="cart-row__img" src={`${process.env.STATIC_URL}/cards/${item.id}/${item.pic}`} alt="" />
            </div>
            <div>
               <p>{item.name}</p>
               <p>Код: {item.code}</p>
               <MoneyFormat {...{ value: item.price, className: 'price-value' }} />
            </div>
            <div style={{ maxWidth: '80px' }}>
               <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{
                     shrink: true,
                  }}
                  defaultValue={cartRows.find((item2: any) => (item2.id === item.id))?.amount}
                  onChange={onChangeCountHandler}
               />
            </div>
            <div>
               <MoneyFormat {...{ value: item.price, className: 'price-value' }} />
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