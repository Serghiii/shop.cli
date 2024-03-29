import axios from "axios"
import React from "react"
import useSWR from "swr"
import { GetServerSideProps } from "next"
import { MainLayout, MainSmartphones, ProductOne } from "../../components"
import { extractId, extractPage, paramsToArr } from "../../src/utils"

const Smartphones: React.FC<any> = ({ params, ispage }) => {
   const fetcher = async (url: string) => await axios.get(url).then(response => response.data);
   const { data, error }: any = useSWR(
      (ispage ? `/products/id/${extractId(params ? params[0] : '')}?ref=smartphones` : '/products/filter/smartphones'),
      fetcher
   )

   return (
      <MainLayout>
         {ispage ?
            <ProductOne data={data ? data[0] : null} error={error} /> :
            <MainSmartphones group={'smartphones'} params={paramsToArr(params)} data={data} pg={extractPage(params)} error={error} />
         }
      </MainLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { slug } = context.query;

   let ispage: boolean = false
   if (slug?.length === 1 && slug[0].length > 5) {
      ispage = (slug[0].slice(-5) === '.html')
   }

   if (ispage) {
      try {
         let q = await fetch(`${process.env.API_URL_EXT}/products/id/${extractId(slug ? slug[0] : '')}?ref=smartphones`)
         if (!q.ok || (await q.json()).length === 0) {
            return {
               notFound: true
            }
         }
      } catch (e) { }
   }

   return {
      props: { params: slug ? slug : null, ispage },
   }
}

export default Smartphones
