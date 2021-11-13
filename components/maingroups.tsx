import React from "react"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from "axios"
import useSWR from "swr"
import { MainBreadcrumbs, MainGroupCard } from "."
import { translate } from '../locales/translate';
import { useRouter } from "next/router";

const MainGroups: React.FC = () => {
   const { locale } = useRouter()

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('groups', fetcher);

   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs />
               </div>
               <h2 className="main-title">{translate('group.title', locale)}</h2>
               <div className="wrapper">
                  <Container maxWidth="xl">
                     <div style={{ marginTop: '3px', marginBottom: '10px' }}>
                        <Grid container spacing={3}>
                           {data?.map((item: any) => (
                              <Grid item key={item.id} >
                                 <MainGroupCard item={item} />
                              </Grid>
                           ))}
                        </Grid>
                     </div>
                  </Container>
               </div>
            </div>
         </div>
      </main >
   )
}

export default MainGroups