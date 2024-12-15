'use client'
import { MainBreadcrumbs, MoneyFormat } from ".."
import useSWR from "swr"
import { useAppDispatch, useAppSelector, AddItem } from "../../redux"
import ProductImages from "./productimages"
import { tt } from "../../common/utils"
import { useEffect, useState } from "react"
import { translate } from "../../locales/translate"
import { axiosService, pageService } from "../../services"

const ProductOne: React.FC<any> = ({ group, data }) => {
   const [extHtml, setExtHtml] = useState({ __html: '' })
   const cartItem = useAppSelector((state: any) => state.cart.cart).find((item: any) => (item.id === data?.id))
   const dispatch = useAppDispatch()
   const locale = 'uk'

   const fetcher = async (url: string) => await axiosService.get(url).then((response) => { setExtHtml({ __html: response.data }) })
   useSWR(data ? `${process.env.STATIC_URL}/cards/${data?.id}/description/${data?.id}_${locale}.html` : null, fetcher)

   useEffect(() => {
      window.history.replaceState('', '', `/${group}/${pageService.makeHeadline(data.id, data.productinfo)}`)
   }, [])
   

   const onClickHandle = () => {
      if (!cartItem) {
         dispatch(AddItem({
            id: data.id,
            code: data.code,
            name: data.name,
            price: data.price,
            priceold: data.priceold,
            amount: data.amount,
            pic: data.pic,
            iamount: 1,
            dcount: data.dcount,
            dpercent: data.dpercent,
            firm: data.firmid
         }))
      }
   }

   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs isProduct={true} />
               </div>
               {data && <div className="product-card">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                     <ProductImages id={data.id} data={data.productpics} />
                     <div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 150px)', width: '100%' }}>
                        <div style={{ fontSize: '30px' }}>{tt(data.name, locale)}</div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                           <div style={{ padding: '20px 0', fontWeight: 'bold' }}>Код: {data?.code}</div>
                           <div className="product-card__price" style={{ paddingBottom: '20px', marginRight: '-5px' }}>
                              <MoneyFormat {...{ value: data?.price, className: 'price-value' }} />
                           </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                           <button className="custom-button-simple" onClick={onClickHandle}>{translate('bay')}</button>
                        </div>
                     </div>
                  </div>
                  <div dangerouslySetInnerHTML={extHtml} />
               </div>}
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

export default ProductOne