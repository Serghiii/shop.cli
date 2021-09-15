import axios from "axios";
import React from "react";
import useSWR from "swr";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { MainProductCard } from ".";
import { arrToParams } from "../src/utils";

const MainProducts: React.FC<any> = ({ group, cond, page }) => {
   const limit = 6

   const fetcher = async (url: string) => await axios.get(url).then((response) => { if (page[0] > 1 && response.data.results.length <= 0) page[1](1); return response.data })
   const { data } = useSWR(`/products/${group}?skip=${(page[0] - 1) * limit}&limit=${limit}${(cond[0].length ? '&' : '') + arrToParams(cond[0])}`, fetcher, { revalidateOnFocus: false });

   return (
      <>
         <div className="main-product-cards">
            {data?.results.map((item: any) => (
               <MainProductCard key={item.id} {...item} group={group} />
            ))}
         </div>
         <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
               {data?.count > 0 && <Pagination count={Math.ceil(data ? data.count / limit : 0)} page={page[0]} shape="rounded" onChange={(event, val) => page[1](val)} />}
            </Stack>
         </div>
      </>
   )
}
export default MainProducts