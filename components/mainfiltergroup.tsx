import React from "react"
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemButton from "@mui/material/ListItemButton"
import { useRouter } from "next/router"
import { CheckBoxItem } from "."

const MainFilterGroup: React.FC<any> = ({ loading, cond, items, fitems, brandZone, brandZoneClick, handleChange }) => {
   const { locale } = useRouter()
   const [open, setOpen] = React.useState(true)

   const handleClick = () => {
      setOpen(!open)
   }

   return (
      <>
         <ListItemButton onClick={handleClick} >
            <ListItemText primary={locale == 'ru' ? items.name_ru : items.name} />
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
               {items.data.map((item: any) => (
                  < CheckBoxItem key={item.prop}
                     loading={loading}
                     data={item}
                     fdata={fitems?.find((el: any) => el.prop === item.prop)}
                     brandZone={brandZone}
                     brandZoneClick={brandZoneClick}
                     checked={cond[0].includes(item.prop)}
                     handleChange={handleChange}
                  />
               ))}
            </List>
         </Collapse>
      </>
   )
}

export default MainFilterGroup