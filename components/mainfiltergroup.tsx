import React from "react";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CheckBoxItem } from ".";
import { useRouter } from "next/router";

const MainFilterGroup: React.FC<any> = ({ cond, items, fitems, brandZone, handleChange }) => {
   const { locale } = useRouter()
   const [open, setOpen] = React.useState(false)

   React.useEffect(() => {
      setOpen(true)
   }, [])

   const handleClick = () => {
      setOpen(!open)
   };

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         nested: {
            paddingLeft: theme.spacing(2),
         },
      }),
   );
   const classes = useStyles()

   return (
      <>
         <ListItem button onClick={handleClick} >
            <ListItemText primary={locale == 'ru' ? items.name_ru : items.name} />
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
               {items.data.map((item: any) => (
                  <ListItem key={item.prop} button className={classes.nested}>
                     <CheckBoxItem
                        data={item}
                        fdata={fitems?.find((el: any) => el.prop == item.prop)}
                        brandZone={brandZone}
                        checked={cond[0].includes(item.prop)}
                        handleChange={handleChange} />
                  </ListItem>
               ))}
            </List>
         </Collapse>
      </>
   )
}
export default MainFilterGroup