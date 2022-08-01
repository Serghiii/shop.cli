import React from "react"
import MoneyFormat from "../money-format"
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AdjustAmount, RemoveItem } from "../../redux";

const CartItem: React.FC<any> = ({ data, doAction }) => {

   const onChangeCountHandler = (e: any) => {
      if (e.target.value <= 0) e.target.value = 1
      if (e.target.value > data.amount) e.target.value = data.amount
      const val: number = e.target.value
      doAction(AdjustAmount({ id: data.id, amount: val }))
   }

   const onClickHandle = (e: any) => {
      doAction(RemoveItem({ id: data.id, amount: 0 }))
   }

   return (
      <>
         <div className="cart-row">
            <div className="cart-row__img-range" >
               <img className="cart-row__img" src={data.id ? `${process.env.STATIC_URL}/cards/${data.id}/${data.pic}` : ''} alt="" />
            </div>
            <div style={{ flex: "1" }}>
               <p>{data.name}</p>
               <p>Код: {data.code}</p>
               <MoneyFormat {...{ value: data.price, className: 'price-value' }} />
            </div>
            <input type="number" style={{ width: "60px", outline: "none", margin: "0 10px 0 10px", padding: "3px" }} min="1" max={data.amount} defaultValue={data.iamount} onChange={onChangeCountHandler} />
            <div>
               <MoneyFormat {...{ value: data.price * data.iamount, className: 'price-value' }} />
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

export default React.memo(CartItem)