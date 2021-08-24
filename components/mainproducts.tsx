import axios from "axios";
import React from "react";
import useSWR from "swr";
import { MainProductCard } from ".";

const MainProducts: React.FC<any> = ({ group }) => {

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('/products/' + group, fetcher);

   return (
      <>
         <div className="main-product-cards">
            {data?.map((item: any) => (
               <MainProductCard key={item.id} {...item} />
            ))}
         </div>
      </>
   )
}
export default MainProducts