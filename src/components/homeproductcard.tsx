'use client'
import Link from "next/link";
// import { useRouter } from "next/router";
import { tt } from "../common/utils";
import { MoneyFormat } from ".";
import { pageService } from "../services";

const HomeProductCard: React.FC<any> = ({ id, name, price, priceold, pic, subgroup, productinfo }) => {
   // const { locale } = useRouter()
   const locale = 'uk'
   const ref = `/${subgroup.ref}/${pageService.makeHeadline(id, productinfo)}`

   return (
      <div className="main-product-card">
         <div className="product-card__view">
            <Link href={ref} locale={locale} className="product-card__ico">
               <img src={`${process.env.STATIC_URL}/cards/${id}/${pic}`} className="product-card__img" alt="" />
            </Link>
         </div>
         <Link href={ref} locale={locale} className="product-card__name">
            {tt(name,locale)}
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