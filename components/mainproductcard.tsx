import Link from "next/link"
import React from "react"
import { CartAction, useCartContext } from "../contexts/cart-context";
import MoneyFormat from "./money-format"

const MainProductCard: React.FC<any> = ({ id, code, name, price, priceold, pic }) => {
   const dispatch = useCartContext().cartState[1];

   const onClickHandle = () => {
      dispatch({ type: CartAction.AddItem, payload: { id } })
   }

   return (
      <div className="main-product-card">
         <p className="product-card__code">{`Код: ${code}`}</p>
         <div className="product-card__view">
            <Link href="/">
               <a className="product-card__ico">
                  <img src={`${process.env.STATIC_URL}/cards/${id}/${pic}`} className="product-card__img" alt="" />
               </a>
            </Link>
         </div>
         <Link href="/">
            <a className="product-card__name">{name}</a>
         </Link>
         <div className="product-card__prices">
            {<div className="product-card__price-old">
               <MoneyFormat {...{ value: priceold, className: 'old-price-value', currency: false }} />
            </div>}
            <img src={`${process.env.STATIC_URL}/icons/cart.svg`} className="product-card__cart-img" alt="" onClick={onClickHandle} />
         </div>
         <div className="product-card__price">
            <MoneyFormat {...{ value: price, className: 'price-value' }} />
         </div>
      </div>
   )
}
export default MainProductCard