import React from "react"
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import ListItemButton from "@mui/material/ListItemButton"

const CheckBoxItem: React.FC<any> = ({ loading, data, fdata, brandZone, brandZoneClick, checked, handleChange }) => {
   const [state, setState] = React.useState(checked)
   let count = (brandZone || brandZoneClick) ? (data.prop.includes('brand-') ? data.count : fdata?.count) : (data.prop?.includes('brand-') ? fdata?.count : data.count)

   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (loading) return
      setState(!state)
      handleChange(e)
   }

   const def = {
      cursor: 'pointer'
   }

   const wait = {
      cursor: 'wait'
   }

   return (
      <>
         <ListItemButton >
            <FormControlLabel
               sx={loading ? wait : def}
               control={
                  <Checkbox
                     sx={loading ? wait : def}
                     checked={state}
                     onChange={handleOnChange}
                     name={data.prop}
                     color="primary"
                  />
               }
               label={`${data.propname} (${count ? count : 0})`}
            />
         </ListItemButton>
      </>
   )
}

export default CheckBoxItem