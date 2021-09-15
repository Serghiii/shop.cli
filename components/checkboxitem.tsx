import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CheckBoxItem: React.FC<any> = ({ data, handleChange, checked }) => {
   const [state, setState] = React.useState(checked)

   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(!state)
      handleChange(e)
   }

   return (
      <>
         <FormControlLabel
            control={
               <Checkbox
                  checked={state}
                  onChange={handleOnChange}
                  name={data.prop}
                  color="primary"
               />
            }
            label={`${data.propname} (${data.count})`}
         />
      </>
   )
}
export default CheckBoxItem