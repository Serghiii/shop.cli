import React from "react"
import axios from "axios";
import useSWR from "swr";
import { GetServerSideProps } from "next"
import { MainLayout, MainProductOne, MainMobiles } from "../../components";
import { extractId, extractPage, paramsToArr } from "../../src/utils";

const Mobiles: React.FC<any> = ({ params, ispage }) => {
   const fetcher = async (url: string) => await axios.get(url).then(response => response.data);
   const { data }: any = useSWR(
      (ispage ? `/products/id/${extractId(params ? params[0] : '')}?ref=mobiles` : '/products/filter/mobiles'),
      fetcher
   )

   return (
      <MainLayout>
         {ispage ?
            <MainProductOne data={data ? data[0] : null} /> :
            <MainMobiles group={'mobiles'} params={paramsToArr(params)} data={data} pg={extractPage(params)} />
         }
      </MainLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { slug } = context.query;

   let ispage: boolean = false
   if (slug?.length) {
      ispage = (slug[0].slice(-5) === '.html')
   }

   if (ispage) {
      try {
         let q = await fetch(`${process.env.API_URL_EXT}/products/id/${extractId(slug ? slug[0] : '')}?ref=mobiles`)
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

export default Mobiles
