import React from "react";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MainFilterGroup } from ".";
import useSWR from "swr";
import axios from "axios";

const MainFilters: React.FC<any> = ({ group, cond, page, fdata }) => {
   const brandZone = cond[0].find((el: string) => el.includes('brand-')) !== undefined

   const fetcher = async (url: string, params: []) => await axios.get(url + params.reduce((acc: string, curr: string) => (
      (brandZone && curr.includes('brand-')) ? acc = acc + curr + '&' : (!brandZone && !curr.includes('brand-')) ? acc = acc + curr + '&' : acc
   ), '?')).then(response => response.data)
   const { data } = useSWR([`/products/filter/${group}/`, cond[0]], fetcher, { revalidateOnFocus: false })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      page[1](1)
      if (e.target.checked) cond[1]([...cond[0], e.target.name])
      else cond[1](cond[0].filter((el: any) => el !== e.target.name))
   };

   const getGroupedItems = () => {
      let fData: [{}] | any = []
      let tmpId: any;
      fdata?.forEach((el: any) => {
         if (tmpId !== el.id) {
            let newData = fdata.filter((item: any) => item.id == el.id)
            fData.push({ id: el.id, name: el.name, data: [...newData] })
            tmpId = el.id
         }
      });
      return fData
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
   const classes = useStyles()

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
               <MainFilterGroup key={item.id}
                  cond={cond}
                  items={item}
                  fitems={data}
                  brandZone={brandZone}
                  handleChange={handleChange} />
            ))}
         </List>
      </>
   )
}
export default React.memo(MainFilters)