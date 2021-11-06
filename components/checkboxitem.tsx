import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CheckBoxItem: React.FC<any> = ({ data, fdata, brandZone, checked, handleChange }) => {
   const [state, setState] = React.useState(checked)
   let count = React.useMemo(() => { return brandZone ? data.prop.includes('brand-') ? data.count : fdata?.count : data.prop.includes('brand-') ? fdata?.count : data.count }, [data, fdata])

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
            label={`${data.propname} (${count ? count : 0})`}
         />
      </>
   )
}
export default React.memo(CheckBoxItem)