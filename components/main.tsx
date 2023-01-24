import axios from 'axios'
import { Categories, Slider } from './'
import { useMainContext } from '../contexts'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
const NewGoods = dynamic(() => import('./newgoods')
   // eslint-disable-next-line react/display-name
   .catch(err => { return () => <p>{err.message}</p> }),
   { /*loading: () => <Loading />,*/ ssr: false }
)

const Main: React.FC = () => {
   const mainCtx = useMainContext();

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('products/new/12', fetcher);

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
                     <NewGoods data={data} />
                  </section>
               </div>
            </div>
         </div>
      </main >
   )
}

export default Main