import React from "react";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MainFilterGroup } from ".";

const MainFilters: React.FC<any> = ({ cond, page, data }) => {

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      page[1](1)
      if (e.target.checked) cond[1]([...cond[0], e.target.name]);
      else cond[1](cond[0].filter((el: any) => el !== e.target.name));
   };

   const getGroupedItems = () => {
      let Data: [{}] | any = []
      let tmpId: any;
      data?.forEach((el: any) => {
         if (tmpId !== el.id) {
            let newData = data.filter((item: any) => item.id == el.id)
            Data.push({ id: el.id, name: el.name, data: [...newData] })
            tmpId = el.id
         }
      });
      return Data
   }

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         root: {
            // width: '100%',
            // maxWidth: 300,
            backgroundColor: theme.palette.background.paper
         },
      }),
   );
   const classes = useStyles();

   return (
      <>
         <List
            className={classes.root}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
               <ListSubheader component="div" id="nested-list-subheader">
                  Фільтр
               </ListSubheader>
            }
         >
            {getGroupedItems().map((item: any) => (
               <MainFilterGroup key={item.id} cond={cond} items={item} handleChange={handleChange} />
            ))}
         </List>
      </>
   )
}
export default MainFilters