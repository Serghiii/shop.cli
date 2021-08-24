import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const MainFilterGroup: React.FC<any> = ({ items, handleChange }) => {
   const [open, setOpen] = React.useState(true);

   const handleClick = () => {
      setOpen(!open);
   };

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         nested: {
            paddingLeft: theme.spacing(2),
         },
      }),
   );
   const classes = useStyles();

   return (
      <>
         <ListItem button onClick={handleClick} >
            <ListItemText primary={items.name} />
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
               {items.data.map((item: any) => (
                  <ListItem key={item.prop} button className={classes.nested}>
                     <FormControlLabel
                        control={
                           <Checkbox
                              onChange={handleChange}
                              name={item.prop}
                              color="primary"
                           />
                        }
                        label={`${item.propname} (${item.count})`}
                     />
                  </ListItem>
               ))}
            </List>
         </Collapse>
      </>
   )
}
export default MainFilterGroup