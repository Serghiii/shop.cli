import axios from "axios";
import { useRouter } from "next/router";
import React from "react"
import { MainBreadcrumbs, MainFilters, MainProducts } from ".";
import { arrToParams } from "../src/utils";

const MainSmartphones: React.FC<any> = ({ params, data, pg }) => {
   const [filters, setFilters] = React.useState<string[]>(params);
   const [page, setPage] = React.useState<number>(pg)
   const router = useRouter()

   const getParams = (Ids: string[]) => {
      let res: string[] = []
      if (Ids.length) {
         axios.post('/propdetail/ids/', { "data": Ids }).then(({ data }) => {
            data.forEach((el: any) => {
               res.push(el.id)
            })
            setFilters(res)
         })
      }
   }

   React.useEffect(() => {
      getParams(params)
   }, [])

   React.useEffect(() => {
      router.push(
         {
            pathname: '/smartphones/[[...slug]]'
         },
         '/smartphones' + (filters.length ? '/' : '') + arrToParams(filters, '/') + (page > 1 ? '/page_' + page : ''),
         { shallow: true }
      )
   }, [filters, page])

   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs />
               </div>
               <h2 className="main-title">Смартфони</h2>
               <div className="main-products">
                  <div>
                     <section className="filters">
                        <MainFilters cond={[filters, setFilters]} page={[page, setPage]} data={data} />
                     </section>
                  </div>
                  <div className="products">
                     <MainProducts group={'smartphones'} cond={[filters, setFilters]} page={[page, setPage]} />
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
export default MainSmartphones