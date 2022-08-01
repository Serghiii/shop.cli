import React from "react"
import Link from "next/link"
import MoneyFormat from "./money-format"
import { makeHeadline } from "../src/utils";
import { useRouter } from "next/router";
import { AddItem, useAppDispatch, useAppSelector } from "../redux";


const MainProductCard: React.FC<any> = ({ id, code, name, amount, price, priceold, pic, group, productinfo }) => {
   const cartItem = useAppSelector((state) => state.cart).find((item: any) => (item.id === id));
   const dispatch = useAppDispatch();
   const { locale } = useRouter()
   const ref = `/${group}/${makeHeadline(id, productinfo)}`

   const onClickHandle = () => {
      if (!cartItem || cartItem.amount < amount) {
         dispatch(AddItem({ id, amount: 0 }))
      }
   }

   return (
      <div className="main-product-card">
         <p className="product-card__code">{`Код: ${code}`}</p>
         <div className="product-card__view">
            <Link href={ref} locale={locale}>
               <a className="product-card__ico">
                  <img src={`${process.env.STATIC_URL}/cards/${id}/${pic}`} className="product-card__img" alt="" />
               </a>
            </Link>
         </div>
         <Link href={ref} locale={locale}>
            <a className="product-card__name">{name}</a>
         </Link>
         <div className="product-card__prices">
            {<div className="product-card__price-old">
               <MoneyFormat {...{ value: priceold, className: 'old-price-value', currency: false }} />
            </div>}
            <img src={`${process.env.STATIC_URL}/icons/${cartItem ? 'checklist.svg' : 'cart.svg'}`} className="product-card__cart-img" alt="" onClick={onClickHandle} />
         </div>
         <div className="product-card__price">
            <MoneyFormat {...{ value: price, className: 'price-value' }} />
         </div>
      </div>
   )
}

export default MainProductCard