import React from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItem from "@mui/material/ListItem";

const CheckBoxItem: React.FC<any> = ({ data, fdata, brandZone, brandZoneClick, checked, handleChange }) => {
   const [state, setState] = React.useState(checked)
   let count = (brandZone || brandZoneClick) ? (data.prop.includes('brand-') ? data.count : fdata?.count) : (data.prop.includes('brand-') ? fdata?.count : data.count)

   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(!state)
      handleChange(e)
   }

   return (
      <>
         <ListItem button>
            <FormControlLabel
               control={
                  <Checkbox
                     checked={state}
                     onChange={handleOnChange}
                     name={data.prop}
                     color="primary"
                  />
               }
               label={`${data.propname} (${count ? count : 0})`}
            />
         </ListItem>
      </>
   )
}
export default React.memo(CheckBoxItem)