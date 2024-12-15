'use client'
import axios from "axios";
import { MainBreadcrumbs, MainFilters, MainProducts } from ".";
// import { arrToParams } from "../common/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "./translatation";
import { pageService } from "../services/page.service";

const MainMobiles: React.FC<any> = ({ group, params, data, pg, error }) => {
   const [filters, setFilters] = useState<string[]>(params);
   const [page, setPage] = useState<number>(pg)
   const { t, replace}  = useTranslation()

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

   useEffect(() => {
      getParams(params)
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      replace(
         {
            pathname: `/${group}/[[...slug]]`
         },
         '/' + group + (filters.length ? '/' : '') + pageService.arrToParams(filters, '/') + (page > 1 ? '/page_' + page : ''),
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
                  <div className="breadcrumbs">
                     <MainBreadcrumbs />
                  </div>
                  <h2 className="main-title">{t('filter.group.title')}</h2>
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
export default MainMobiles