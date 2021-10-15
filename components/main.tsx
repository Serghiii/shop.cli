import axios from 'axios';
import { Categories, HomeProductCard, Slider } from './'
import { useMainContext } from '../contexts';
import useSWR from 'swr';
import React from 'react';
import { useRouter } from 'next/router';
import { translate } from '../locales/translate';

const Main: React.FC = () => {
   const mainCtx = useMainContext();
   const { locale } = useRouter()

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('products/new/12', fetcher, { revalidateOnFocus: false });

   return (
      <main>
         <div className="container">
            <div className="main">
               <Categories categories={mainCtx.Categories} />
               <div className="menu-backdrop"></div>
               <div ref={mainCtx.mainSwiper} className="main-swiper">
                  <Slider />
               </div>
               <div className="main-sections">
                  <section className="main-new-goods">
                     <h2 className="main-new-goods-title">{translate('goods.title', locale)}</h2>
                     <div className="main-product-cards">
                        {data?.map((obj: any) => (
                           <HomeProductCard key={obj.id} {...obj} />
                        ))}
                     </div>
                  </section>
               </div>
            </div>
         </div>
      </main >
   )
}
export default Main