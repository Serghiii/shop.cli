import React from "react"
import { MainBreadcrumbs } from ".";
import { CartAction, useCartContext } from "../contexts";
import MoneyFormat from "./money-format"
import { translate } from '../locales/translate';
import { useRouter } from "next/router";

const MainMobile: React.FC<any> = ({ data }) => {
   const cartItem = useCartContext().cartState[0].find((item: any) => (item.id === data[0].id))
   const dispatch = useCartContext().cartState[1];
   const { locale } = useRouter()

   const onClickHandle = () => {
      if (!cartItem || cartItem.amount < data[0].amount) {
         const id = data[0].id
         dispatch({ type: CartAction.AddItem, payload: { id } })
      }
   }

   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs isProduct={true} />
               </div>
               <div className="product-card">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                     <div style={{ width: '600px', height: '400px', display: 'flex', justifyContent: 'center' }}>
                        <img src={`${process.env.STATIC_URL}/cards/${data[0].id}/${data[0].pic}`} className="product-card__big-img" alt="" />
                     </div>
                     <div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 150px)', width: '100%' }}>
                        <div style={{ fontSize: '30px' }}>{data[0].name}</div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                           <div style={{ padding: '20px 0', fontWeight: 'bold' }}>Код: {data[0].code}</div>
                           <div className="product-card__price" style={{ paddingBottom: '20px', marginRight: '-5px' }}>
                              <MoneyFormat {...{ value: data[0].price, className: 'price-value' }} />
                           </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                           <button className="custom-button-simple" onClick={onClickHandle}>{translate('bay', locale)}</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
export default MainMobile