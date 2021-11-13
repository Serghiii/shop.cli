import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

const MainGroupCard: React.FC<any> = ({ item }) => {
   const { locale } = useRouter()
   const [raised, setRaised] = useState(false);
   const toggleRaised = () => setRaised(!raised);

   return (
      <Link href={`/${item.ref}`} passHref>
         <Box width={200} height='100%'>
            <Card
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
                        {locale == 'ru' ? item.name_ru : item.name}
                     </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
         </Box>
      </Link>
   )
}

export default MainGroupCard