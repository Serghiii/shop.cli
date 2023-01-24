import { useRouter } from "next/router"
import { HomeProductCard } from "."
import { translate } from "../locales/translate"

const NewGoods: React.FC<any> = ({ data }) => {
   const { locale } = useRouter()

   return (
      <>
         <h2 className="main-new-goods-title">{translate('goods.title', locale)}</h2>
         <div className="main-product-cards">
            {data?.map((obj: any) => (
               <HomeProductCard key={obj.id} {...obj} />
            ))}
         </div>
      </>
   )
}
export default NewGoods