import axios from "axios";
import React from "react";
import useSWR from "swr";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Loading, MainProductCard } from ".";
import { arrToParams } from "../src/utils";

const MainProducts: React.FC<any> = ({ group, cond, page }) => {
   const limit = 6

   const fetcher = async (url: string, page: number, setPage: (page: number) => {}, cond: []) => {
      return await axios.get(url + `?skip=${(page - 1) * limit}&limit=${limit}${(cond.length ? '&' : '') + arrToParams(cond)}`)
         .then((response) => {
            if (page > 1 && response.data.results.length <= 0) setPage(1);
            return response.data
         })
   }
   const { data } = useSWR([`/products/${group}`, page[0], page[1], cond[0]], fetcher, { revalidateOnFocus: false/*, suspense: true*/ });

   const setPage = (e: any, val: any) => {
      page[1](val)
   }

   return (
      <>
         {data ? (
            <>
               <div className="main-product-cards">
                  {data?.results.map((item: any) => (
                     <MainProductCard key={item.id} {...item} group={group} />
                  ))}
               </div>
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <Stack spacing={2}>
                     {data?.count > 0 && <Pagination count={Math.ceil(data ? data.count / limit : 0)} page={page[0]} shape="rounded" onChange={setPage} />}
                  </Stack>
               </div>
            </>
         ) : (<Loading />)
         }
      </>
   )
}
export default React.memo(MainProducts)