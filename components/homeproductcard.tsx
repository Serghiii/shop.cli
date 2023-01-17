import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { makeHeadline } from "../src/utils";
import MoneyFormat from "./money-format";

const HomeProductCard: React.FC<any> = ({ id, name, price, priceold, pic, group, productinfo }) => {
   const { locale } = useRouter()
   const ref = `/${group.ref}/${makeHeadline(id, productinfo)}`

   return (
      <div className="main-product-card">
         <div className="product-card__view">
            <Link href={ref} locale={locale} className="product-card__ico">
               <img src={`${process.env.STATIC_URL}/cards/${id}/${pic}`} className="product-card__img" alt="" />
            </Link>
         </div>
         <Link href={ref} locale={locale} className="product-card__name">
            {name}
         </Link>
         <div className="product-card__prices">
            {<div className="product-card__price-old">
               <MoneyFormat {...{ value: priceold, className: 'old-price-value', currency: false }} />
            </div>}
            <div className="product-card__price">
               <MoneyFormat {...{ value: price, className: 'price-value' }} />
            </div>
         </div>
      </div>
   )
}
export default HomeProductCard