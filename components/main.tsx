import axios from 'axios';
import { Categories, Slider } from './'
import { useMainContext } from '../contexts';
import useSWR from 'swr';
import React from 'react';
import dynamic from 'next/dynamic'
const NewGoods = dynamic(() => import('./newgoods'))

const Main: React.FC = () => {
   const mainCtx = useMainContext();

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
                  <NewGoods data={data} />
               </div>
            </div>
         </div>
      </main >
   )
}
export default Main