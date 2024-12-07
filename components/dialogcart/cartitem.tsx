import React from "react"
import MoneyFormat from "../money-format"
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { AdjustAmount, RemoveItem } from "../../redux"
import { tt } from "../../src/utils"

const CartItem: React.FC<any> = ({ data, locale, doAction }) => {

   const onChangeCountHandler = (e: any) => {
      if (e.target.value <= 0) e.target.value = 1
      if (e.target.value > data.amount) e.target.value = data.amount
      const val: number = e.target.value
      doAction(AdjustAmount({ id: data.id, amount: val }))
   }

   const onClickHandle = (e: any) => {
      doAction(RemoveItem(data.id))
   }

   return (
      <>
         <div className="cart-row">
            <div className="cart-row__img-range" >
               <img className="cart-row__img" src={data.id ? `${process.env.STATIC_URL}/cards/${data.id}/${data.pic}` : ''} alt="" />
            </div>
            <div style={{ flex: "1" }}>
               <p>{tt(data.name, locale)}</p>
               <p>Код: {data.code}</p>
               <MoneyFormat {...{ value: data.price, className: 'price-value' }} />
            </div>
            <input type="number" className="cart-row__inpit-amount" autoComplete="off"
               min="1" max={data.amount} defaultValue={data.iamount} onChange={onChangeCountHandler} />
            <div>
               <MoneyFormat {...{ value: data.iamount >= data.dcount? data.price*data.iamount - (data.price*data.iamount*data.dpercent)/100 : data.price*data.iamount, className: 'price-value' }} />
            </div>
            <div>
               <IconButton aria-label="delete" component="span" disableRipple={false} onClick={onClickHandle}>
                  <DeleteForeverIcon color="action" />
               </IconButton>
            </div>
         </div>
      </>
   )
}

export default React.memo(CartItem)