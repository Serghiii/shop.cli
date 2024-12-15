import { MainLayout, ProductOne, MainSubgroups } from "../../components"
import { notFound } from "next/navigation"
import { axiosService, pageService } from "../../services"

export default async function Page ({ params }: { params: Promise<{ slug: string[] }> }) {
   const slug = (await params).slug
   const isproduct = pageService.isProduct(slug)
   const isgroup = pageService.isGroup(slug)

   let data:any = null
   let error:any = null
   try {
      data = await (await axiosService.get((isproduct ? `/products/id/${pageService.extractId(slug[1])}?ref=${slug[0]}` :
                                            isgroup ? `/products/filter/${slug[0]}` : ''))).data
   } catch (e: any){
      error = { message: e.response ? (e.response.status ? e.response.data.message : e.message) : e.message }
   }
   if ((!data || data.length == 0) && !error) notFound()

   // console.log('data ', slug, isproduct, isgroup)

   return (
      <MainLayout>
         {isproduct ? <ProductOne data={data?.length>0?data[0]:null} error={error} /> :
            isgroup ? <MainSubgroups group={slug[0]} params={pageService.paramsToArr(slug.slice(1))} data={data?.length>0?data:null} pg={pageService.extractPage(slug)} error={error} />
            :notFound()
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
