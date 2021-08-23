import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core"
import axios from "axios"
import Link from "next/link"
import Image from 'next/image'
import React, { useState } from "react"
import useSWR from "swr"
import { MainBreadcrumbs } from "./"

const MainGroupTypes: React.FC = () => {
   // const [raised, setRaised] = useState(false);

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('groups', fetcher);

   const useStyles = makeStyles((theme) => ({
      card: {
         // minWidth: 200,
         // maxWidth: 200,
         // padding: 5,
         width: 200,
         height: '100%',
         margin: 'auto',
         // '&:hover': {
         // raised: true,
         // background: "#f00",
         // },
      },
      // .card>button>img {
      //    height: auto;
      // },
      media: {
         height: 160,
         // paddingTop: '56.25%', // 16:9
         // marginTop: '30',
         // width: '33%',
         // marginLeft: '33%',
         // maxHeight: 50,
         // margin: 15,
         // padding: '5%',
         width: '100%',
         // margin: 'auto',
         // marginLeft: '5%',
         // objectFit: 'cover'
      },
   }))
   const classes = useStyles();

   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs />
               </div>
               <h2 className="main-title">Смартфони, мобільні телефони, аксесуари</h2>
               <div className="wrapper">
                  <Container maxWidth="xl">
                     <Grid container spacing={4}>
                        {data?.map((item: any) => (
                           <Grid item key={item.id} >
                              <Link href={`/${item.ref}`}>
                                 <Card
                                    className={classes.card}
                                    raised={false}
                                    // width="300"
                                    variant="outlined"

                                 >
                                    <CardActionArea>
                                       {/* <CardMedia
                                          component="img"
                                          // height="200"
                                          className={classes.media}
                                          alt={item.name}
                                          // image={`${process.env.STATIC_URL}/groups/${item.pic}`}
                                          title={item.name} >
                                       </CardMedia> */}
                                       {/* <Image src={`${process.env.STATIC_URL}/groups/${item.pic}` as any} height="140px" width="140px" alt="Picture of the author" /> */}
                                       <Box display='flex' justifyContent='center'>
                                          {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
                                          <img style={{ maxHeight: "160px", maxWidth: "100%", margin: "10px" }} src={`${process.env.STATIC_URL}/groups/${item.pic}`} alt={item.name} />
                                          {/* </div> */}
                                       </Box>
                                       <CardContent
                                       // className={classes.cardContent}
                                       >
                                          <Typography variant="h6" component="h6" gutterBottom>
                                             {item.name}
                                          </Typography>
                                       </CardContent>
                                    </CardActionArea>
                                 </Card>
                              </Link>
                           </Grid>
                        ))}
                     </Grid>
                  </Container>
               </div>
            </div>
         </div>
      </main >
   )
}

export default MainGroupTypes