'use client'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemButton from "@mui/material/ListItemButton"
import { CheckBoxItem } from "."
import { tt } from "../common/utils"
import { useState } from 'react'

const MainFilterGroup: React.FC<any> = ({ loading, cond, items, fitems, brandZone, brandZoneClick, handleChange }) => {
   const locale = 'uk'
   const [open, setOpen] = useState(true)

   const handleClick = () => {
      setOpen(!open)
   }
   return (
      <>
         {items && <ListItemButton onClick={handleClick} >
            <ListItemText primary={tt(items.name, locale)}/>
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>}
         {items && <Collapse in={open} timeout="auto" unmountOnExit>
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
         </Collapse>}
      </>
   )
}

export default MainFilterGroup