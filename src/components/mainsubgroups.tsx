'use client'
import { MainBreadcrumbs, MainFilters, MainProducts } from ".";
import { translate } from "../locales/translate";
import { useEffect, useState } from "react";
import { axiosService, pageService } from "../services";

const MainSubgroups: React.FC<any> = ({ group, params, data, pg, error }) => {
   const [filters, setFilters] = useState<string[]>(params);
   const [page, setPage] = useState<number>(pg)
   const locale = 'uk'
   const getParams = (Ids: string[]) => {
      let res: string[] = []
      if (Ids.length) {
         axiosService.post('/propdetail/ids/', { "data": Ids }).then(({ data }) => {
            data.forEach((el: any) => {
               res.push(el.id)
            })
            setFilters(res)
         })
      }
   }

   useEffect(() => {
      getParams(params)
   }, [])

   useEffect(() => {
      window.history.replaceState('', '', '/' + group + (filters.length ? '/' : '') + pageService.arrToParams(filters, '/') + (page > 1 ? '/page_' + page : ''))
   }, [filters, page])

   return (
      <main>
         {error && <p>{error.message}</p>}
         {data &&
            <div className="container">
               <div className="main">
                  <div className="breadcrumbs">
                     <MainBreadcrumbs />
                  </div>
                  <h2 className="main-title">{translate('filter.group.title', locale)}</h2>
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
export default MainSubgroups