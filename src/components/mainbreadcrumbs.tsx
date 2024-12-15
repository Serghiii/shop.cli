'use client'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeIcon from '@mui/icons-material/Home'
import Link from "next/link"
import { tt } from '../common/utils'
import { useParams  } from 'next/navigation'
import { reduxService } from '../services'

const MainBreadcrumbs: React.FC<any> = ({ isProduct = false }) => {
   const menu = reduxService.getMenu()
   
   const locale = 'uk'
   const { slug } = useParams()

   const getItems = (): any[] => {
      let res: [] = []
      if (slug && typeof slug === 'object' && slug.length > 0){
         slug.forEach(item => { getItem(res, item) })
         // getItem(res, place)
      }
      return res
   }

   function getItem(items: any[], str: string) {
      const subgroup = getSubGroup(str)
      if (subgroup) {
         const group = menu.groups?.find((el: any) => el.id == subgroup.group.id)
         const category = menu.categories?.find((el: any) => el.id == group.category.id)
         items.push({ to: category?.ref, label: tt(category?.name, locale) })
         items.push({ to: group?.ref, label: tt(group?.name, locale) })
         items.push({ to: subgroup?.ref, label: tt(subgroup?.name, locale) })
      } else {
         const group = getGroup(str)
         if (group) {
            const category = menu.categories?.find((el: any) => el.id == group.category.id)
            items.push({ to: category?.ref, label: tt(category?.name, locale) })
            items.push({ to: group?.ref, label: tt(group?.name, locale) })
         } 
         else {
            const category = getCategory(str)
            if (category) items.push({ to: category?.ref, label: tt(category?.name, locale) })
         }
      }
   }

   function getCategory(str: string) {
      return menu.categories?.find((el: any) => el.ref == str)
   }

   function getGroup(str: string) {
      return menu.groups?.find((el: any) => el.ref == str)
   }

   function getSubGroup(str: string) {
      return menu.subgroups?.find((el: any) => el.ref == str)
   }
   
   typeof window !== 'undefined'

   return (
      <>
         <Breadcrumbs className="breadcrumb-ol" aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/">
               <HomeIcon />
            </Link>
            {window && menu.started && getItems().map((item: any, index: number, arr: any) => (
               ((index >= arr.length - 1) && (isProduct === false)) ? (
                  <Typography color="textPrimary" key={item.to}>{item.label}</Typography>
               ) : (
                  <Link key={item.to} href={`/${item.to}`}>
                     {item.label}
                  </Link>
               )
            ))}
         </Breadcrumbs>
         <style global jsx>{`
            .breadcrumb-ol>.MuiBreadcrumbs-ol {
               flex-wrap: nowrap;
            }
            .breadcrumb-ol a {
               white-space: nowrap;
            }
            .breadcrumb-ol .MuiSvgIcon-root {
               width: 22px;
               height: 22px;
            }
         `}
         </style>
      </>
   )
}

export default MainBreadcrumbs