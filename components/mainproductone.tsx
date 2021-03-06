import React from "react"
import { MainBreadcrumbs } from ".";
import MoneyFormat from "./money-format"
import { translate } from '../locales/translate';
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "../redux";
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'

const MainProductOne: React.FC<any> = ({ data }) => {
   const [extHtml, setExtHtml] = React.useState({ __html: '' })
   const cartItem = useSelector((state: any) => state.cart).find((item: any) => (item.id === data?.id))
   const dispatch = useDispatch();
   const { locale } = useRouter()

   const fetcher = async (url: string) => await axios.get(url).then((response) => { setExtHtml({ __html: response.data }) })
   useSWR(`${process.env.STATIC_URL}/cards/${data?.id}/description/${data?.id}_${locale}.html`, fetcher, { revalidateOnFocus: false });

   const onClickHandle = () => {
      if (!cartItem || cartItem.amount < data?.amount) {
         const id = data?.id
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
                     <div style={{ margin: '0 60px 0 60px' }}>
                        {data ? (
                           <InnerImageZoom src={`${process.env.STATIC_URL}/cards/${data?.id}/images/1.webp`} zoomType={'hover'} width={270} height={370} hideHint={true} />
                        ) : (<div style={{ width: '270px', height: '370px' }}></div>)
                        }
                     </div>
                     <div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 150px)', width: '100%' }}>
                        <div style={{ fontSize: '30px' }}>{data?.name}</div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                           <div style={{ padding: '20px 0', fontWeight: 'bold' }}>??????: {data?.code}</div>
                           <div className="product-card__price" style={{ paddingBottom: '20px', marginRight: '-5px' }}>
                              <MoneyFormat {...{ value: data?.price, className: 'price-value' }} />
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
export default MainProductOne