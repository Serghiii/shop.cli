import React from "react"
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import { MainFilterGroup } from "."
import useSWR from "swr"
import axios from "axios"
import { useRouter } from "next/router"

const MainFilters: React.FC<any> = ({ group, cond, page, fdata }) => {
   const [loading, setLoading] = React.useState(false)
   const [data, setData] = React.useState([])
   const [brandZoneClick, setBrandZoneClick] = React.useState(false) // відслідковує момент натискання у зоні бренд для запобігання бліків оновлення у зоні бренд
   const { locale } = useRouter()
   const brandZone = React.useMemo(() => { // бренд зона
      return Boolean(cond[0].find((el: string) => el.includes('brand-')) !== undefined)
   }, [cond])

   const url = `/products/filter/${group}` + cond[0].reduce((acc: string, curr: string) => (
      (brandZone && curr.includes('brand-')) ? acc = acc + curr + '&' : (!brandZone && !curr.includes('brand-')) ? acc = acc + curr + '&' : acc
   ), '?')
   const fetcher = async (url: string) => {
      setLoading(true)
      await axios.get(url).then(response => {
         setLoading(false)
         setBrandZoneClick(false)
         setData(response.data)
      }).catch(e => setLoading(false))
   }
   useSWR(url, fetcher)

   const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      page[1](1)
      setBrandZoneClick(e.target.name.includes('brand-'))
      if (e.target.checked) cond[1]([...cond[0], e.target.name])
      else cond[1](cond[0].filter((el: any) => el !== e.target.name))
   }, [cond, page])

   const getGroupedItems = React.useCallback(() => {
      let fData: [{}] | any = []
      let tmpId: any;
      fdata?.forEach((el: any) => {
         if (tmpId !== el.id) {
            let newData = fdata.filter((item: any) => item.id === el.id)
            fData.push({ id: el.id, name: el.name, name_ru: el.name_ru, data: [...newData] })
            tmpId = el.id
         }
      });
      return fData
   }, [fdata])

   return (
      <>
         <List
            sx={{ bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
               <ListSubheader component="div" id="nested-list-subheader">
                  {locale == 'ru' ? 'Фильтр' : 'Фільтр'}
               </ListSubheader>
            }
         >
            {getGroupedItems().map((item: any) => (
               <MainFilterGroup key={item.id}
                  loading={loading}
                  cond={cond}
                  items={item}
                  fitems={data}
                  brandZone={brandZone}
                  brandZoneClick={brandZoneClick}
                  handleChange={handleChange} />
            ))}
         </List>
      </>
   )
}

export default MainFilters