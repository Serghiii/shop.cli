import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Link from "next/link"
import { useState } from "react"

const MainGroupCard: React.FC<any> = ({ item }) => {
   const [raised, setRaised] = useState(false);

   const useStyles = makeStyles((theme) => ({
      card: {
         width: 200,
         height: '100%',
      },
   }))
   const classes = useStyles();

   const toggleRaised = () => setRaised(!raised);

   return (
      <Link href={`/${item.ref}`} passHref>
         <Box width={200} height='100%'>
            <Card
               className={classes.card}
               raised={raised}
               onMouseOver={toggleRaised}
               onMouseOut={toggleRaised}
            >
               <CardActionArea>
                  <Box display='flex' justifyContent='center' pt={3}>
                     <img style={{ maxHeight: "160px", maxWidth: "100%" }} src={`${process.env.STATIC_URL}/groups/${item.pic}`} alt={item.name} />
                  </Box>
                  <CardContent>
                     <Typography variant="h6" align="center" color='textPrimary'>
                        {item.name}
                     </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
         </Box>
      </Link>
   )
}

export default MainGroupCard