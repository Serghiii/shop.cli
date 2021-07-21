import Link from "next/link";
import React from "react";
import MoneyFormat from "./money-format";

const MainProductCard: React.FC<any> = ({ id, name, price, priceold, pic }) => {
   return (
      <div className="main-product-card">
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
            <div className="product-card__price">
               <MoneyFormat {...{ value: price, className: 'price-value' }} />
            </div>
         </div>
      </div>
   )
}
export default MainProductCard