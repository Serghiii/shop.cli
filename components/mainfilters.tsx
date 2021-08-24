import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MainFilterGroup } from ".";

const MainFilters: React.FC = () => {
   // const [filters, setFilters] = React.useState<{ [key: string]: string | any }>({});
   const [filters, setFilters] = React.useState<any>({ arr: [] });

   const router = useRouter();
   const place = router.pathname.split("/")[1];

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('/products/filter/' + place, fetcher);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) setFilters({ arr: [...filters.arr, event.target.name] });
      else setFilters({ arr: filters.arr.filter((el: any) => el !== event.target.name) });
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
         // className={classes.root}
         >
            {getGroupedItems().map((item: any) => (
               <MainFilterGroup key={item.id} items={item} handleChange={handleChange} />
            ))}
         </List>
      </>
   )
}
export default MainFilters