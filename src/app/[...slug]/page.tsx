// import { GetServerSideProps } from "next"
import { MainLayout, ProductOne, MainSubgroups } from "../../components"
import { notFound } from "next/navigation"
import { axiosService, pageService } from "../../services"

export default async function Page ({ params }: { params: Promise<{ slug: string[] }> }) {
   // const { data, error } = swrService.useSWRGet((ispage ? `/products/id/${extractId(params ? params[0] : '')}?ref=smartphones` : '/products/filter/smartphones'))
   const slug = (await params).slug
   // console.log('slug ', slug)
   const isproduct = pageService.isProduct(slug)
   // console.log('fetch ', isproduct ? `/products/id/${pageService.extractId(slug[1])}?ref=${slug[0]}` : `/products/filter/${slug[0]}`)
   let data:any = null
   let error:any = null
   try {
      data = (await axiosService.get((isproduct ? `/products/id/${pageService.extractId(slug[1])}?ref=${slug[0]}` : `/products/filter/${slug[0]}`))).data
   } catch (e){
      error = e
   }
   if (data.length == 0 && !error) notFound()

   // console.log('data ', data, error)
   return (
      <MainLayout>
         {isproduct ?
            <ProductOne data={data.length>0?data[0]:null} error={error} /> :
            <MainSubgroups group={slug[0]} params={slug} data={data.length>0?data:null} pg={pageService.extractPage(slug)} error={error} />
         }
      </MainLayout>
   )
}

/*
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
*/
