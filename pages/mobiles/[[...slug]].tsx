import axios from "axios";
import { GetServerSideProps } from "next"
import React from "react"
import { MainLayout, MainMobile, MainMobiles } from "../../components";
import { extractId, extractPage, paramsToArr } from "../../src/utils";

const Mobiles: React.FC<any> = ({ params, ispage, data }) => {
   return (
      <MainLayout title='Інтернет-магазин Евік'>
         {ispage ? <MainMobile data={data} /> : <MainMobiles group={'mobiles'} params={paramsToArr(params)} data={data} pg={extractPage(params)} />}
      </MainLayout>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { slug } = context.query;

   let ispage: boolean = false
   if (slug?.length) {
      ispage = (slug[0].slice(-5) === '.html')
   }

   let q: any
   if (ispage) {
      try {
         q = await axios.get('/products/id/' + extractId(slug ? slug[0] : '') + '?ref=mobiles')
         if (!q || q.data.length <= 0) {
            return {
               notFound: true
            }
         }
      } catch (e) { }
   } else {
      try {
         q = await axios.get('/products/filter/mobiles')
      } catch (e) { }
   }

   return {
      props: { params: slug ? slug : null, ispage, data: q ? q.data : null },
   }
}

export default Mobiles
