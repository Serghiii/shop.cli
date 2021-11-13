import React from "react"
import { MainBreadcrumbs } from ".";
import { CartAction, useCartContext } from "../contexts";
import MoneyFormat from "./money-format"
import { translate } from '../locales/translate';
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
const ReactImageZoom = require('react-image-zoom');

const MainSmartphone: React.FC<any> = ({ data }) => {
   const [extHtml, setExtHtml] = React.useState({ __html: '' })
   const cartItem = useCartContext().cartState[0].find((item: any) => (item.id === data[0].id))
   const dispatch = useCartContext().cartState[1];
   const { locale } = useRouter()

   const fetcher = async (url: string) => await axios.get(url).then((response) => { setExtHtml({ __html: response.data }) })
   useSWR(`${process.env.STATIC_URL}/cards/${data[0].id}/description/${data[0].id}_${locale}.html`, fetcher, { revalidateOnFocus: false });

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
                     <div style={{ margin: '0 60px 0 60px', cursor: 'zoom-in' }}>
                        <ReactImageZoom {...{ width: 270, height: 370, zoomWidth: 270, img: `${process.env.STATIC_URL}/cards/${data[0].id}/images/1.webp` }} />
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
                  <div dangerouslySetInnerHTML={extHtml} />
               </div>
            </div>
            <style global jsx>{`
               .center-img {
                  display: block;
                  margin: 0 auto;
               }
            `}
            </style>
         </div>
      </main>
   )
}
export default MainSmartphone