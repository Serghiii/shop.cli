'use client'
import { HomeProductCard } from "."
import { useDictionary } from "../contexts"

const NewGoods: React.FC<any> = ({ data }) => {
   const {d} = useDictionary()
   return (
      <>
         <h2 className="main-new-goods-title">{d.goods.title}</h2>
         <div className="main-product-cards">
            {data?.map((obj: any) => (
               <HomeProductCard key={obj.id} {...obj} />
            ))}
         </div>
      </>
   )
}

export default NewGoods