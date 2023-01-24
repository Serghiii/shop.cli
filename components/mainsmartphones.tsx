import axios from "axios";
import { useRouter } from "next/router";
import React from "react"
import { MainBreadcrumbs, MainFilters, MainProducts } from ".";
import { translate } from "../locales/translate";
import { arrToParams } from "../src/utils";

const MainSmartphones: React.FC<any> = ({ group, params, data, pg, error }) => {
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
      // eslint-disable-next-line
   }, [])

   React.useEffect(() => {
      router.replace(
         {
            pathname: `/${group}/[[...slug]]`
         },
         '/' + group + (filters.length ? '/' : '') + arrToParams(filters, '/') + (page > 1 ? '/page_' + page : ''),
         { shallow: true }
      )
      // eslint-disable-next-line
   }, [filters, page])

   return (
      <main>
         {error && <p>{error.message}</p>}
         {data &&
            <div className="container">
               <div className="main">
                  {/* <div>Smartphones</div>
               <div>group: {group}</div>
               <div>params: {params}</div>
               {data?.map((item: any) => (
                  <div key={item.id}>{item.prop}</div>
               ))} */}
                  {/* <div>replace: {'/' + group + (filters.length ? '/' : '') + arrToParams(filters, '/') + (page > 1 ? '/page_' + page : '')}</div>
               <div>pg: {pg}</div> */}
                  <div className="breadcrumbs">
                     <MainBreadcrumbs />
                  </div>
                  <h2 className="main-title">{translate('filter.group.title', router.locale)}</h2>
                  <div className="main-products">
                     <div>
                        <section className="filters">
                           <MainFilters group={group} cond={[filters, setFilters]} page={[page, setPage]} fdata={data} />
                        </section>
                     </div>
                     <div className="products">
                        <MainProducts group={group} cond={[filters, setFilters]} page={[page, setPage]} />
                     </div>
                  </div>
               </div>
            </div>
         }
      </main>
   )
}
export default MainSmartphones