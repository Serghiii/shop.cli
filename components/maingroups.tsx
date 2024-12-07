import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { MainBreadcrumbs, MainGroupCard } from "."
import { useRouter } from "next/router"
import { useMainContext } from "../contexts"
import { tt } from "../src/utils"

const MainGroups: React.FC = () => {
   const mainCtx = useMainContext()
   const { locale, pathname } = useRouter()

   const getItems = (): any[] => {
      let res: any[]
      let part: string = pathname.split("/")[1]
      const category = getCategory(part)
      if (category) {
         res = getGroupsByCategoty(category.id)
      } else {
         res = getGroup(part)
      }
      return res
   }

   function getCategory(str: string) {
      return mainCtx.categoryItems?.find((el: any) => el.ref == str)
   }

   function getGroup(str: string) {
      return mainCtx.groupItems?.find((el: any) => el.ref == str)
   }

   function getGroupsByCategoty(categoryId: number) {
      return mainCtx.groupItems?.filter((el: any) => el.categoryId === categoryId)
   }

   function getSubGroupsByGroup(groupId: number) {
      return mainCtx.subgroupItems?.filter((el: any) => el.groupId === groupId)
   }

   return (
      <>
         <main>
            <div className="container">
               <div className="main">
                  <div className="breadcrumbs">
                     <MainBreadcrumbs />
                  </div>
                  { getItems()?.map((item: any) => (
                     <div className="mb-10">
                        <h2 className="main-title">{tt(item.name, locale)}</h2>
                        <Container maxWidth="xl">
                           <div style={{ marginTop: '3px', marginBottom: '10px' }}>
                              <Grid container spacing={3}>
                                 {getSubGroupsByGroup(item.id)?.map((item: any) => (
                                    <Grid key={item.id} >
                                       <MainGroupCard item={item} />
                                    </Grid>
                                 ))}
                              </Grid>
                           </div>
                        </Container>
                     </div>
                  )) }
               </div>
            </div>
         </main >
         <style jsx>{`
               .mb-10 {
                  margin-bottom: 10px;
               }
            `}
         </style>
      </>
   )
}

export default MainGroups