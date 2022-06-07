import React from "react"
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from "next/router";
import MoneyFormat from '../money-format';
import { translate } from "../../locales/translate"
import { CartItem } from '.';
import { Loading } from "../.";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const FullCart = () => {
   const [data, setData] = React.useState<any>(undefined)
   const cartRows = useSelector((state: any) => state.cart);
   const dispatch = useDispatch();
   const { locale } = useRouter()

   let status = {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
   };

   const getIDs: any = () => {
      let data: number[] = []
      cartRows.forEach((el: any) => {
         data.push(el.id)
      });
      return { data }
   }

   const fetcher = async (url: string) => await axios.post(url, getIDs()).then(response => setData(response.data))
   useSWR('products/cart', fetcher);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   }

   const getData = (item: any) => {
      return { ...data?.find((item2: any) => (item2.id === item.id)), iamount: item.amount }
   }

   const getTotalSum = (products: any, items: any) => {
      try {
         return items
            .map(({ id, amount }: any) => ({
               product: products?.find((p: any) => p.id === id),
               amount,
            }))
            .map(({ product: { price }, amount }: any) => amount * price)
            .reduce((acc: any, cur: any) => acc + cur, 0);
      }
      catch (e: any) { }
   };

   const doAction = (action: any) => {
      dispatch(action)
   }

   return (
      <div className="dialog-body cart">
         <form className="dialog-form" onSubmit={handleSubmit}>
            {data ? (
               <motion.div
                  variants={status}
                  initial="hidden"
                  animate="show"
               >
                  {data !== undefined &&
                     cartRows?.map((item: any) => (
                        <CartItem data={getData(item)} doAction={doAction} key={item.id} />
                     ))}
                  <div style={{ padding: "5px 20px 20px 0", textAlign: "right" }}>
                     <span style={{ fontSize: "20px" }}>{translate('cart.total', locale)}</span>
                     <MoneyFormat {...{ value: data !== undefined ? getTotalSum(data, cartRows) : 0, className: 'price-value' }} />
                  </div>
                  <div style={{ float: "right", paddingRight: "20px" }}>
                     <div style={{ maxWidth: "400px" }}>
                        <button className="custom-button">{translate('cart.place_order', locale)}</button>
                     </div>
                  </div>
               </motion.div>
            ) : (<Loading />)}
         </form >
      </div >
   )
}
export default FullCart