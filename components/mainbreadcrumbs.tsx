import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from "next/router"
import { useMainContext } from "../contexts"
import Link from "next/link"
import { tt } from '../src/utils'

const MainBreadcrumbs: React.FC<any> = ({ isProduct = false }) => {
   const mainCtx = useMainContext()
   const { locale, pathname } = useRouter()

   const getItems = (): any[] => {
      let res: any[] = []
      let parts = pathname.split("/")
      const place = parts[parts.length - 1]
      parts = parts.slice(1, parts.length - 1)
      parts.forEach(item => { getItem(res, item) })
      getItem(res, place)
      return res
   }

   function getItem(items: any[], str: string) {
      const subgroup = getSubGroup(str)
      if (subgroup) {
         const group = mainCtx.groupItems?.find((el: any) => el.id == subgroup.groupId)
         const category = mainCtx.categoryItems?.find((el: any) => el.id == group.categoryId)
         items.push({ to: category?.ref, label: tt(category?.name, locale) })
         items.push({ to: group.ref, label: tt(group.name, locale) })
         items.push({ to: subgroup.ref, label: tt(subgroup.name, locale) })
      } else {
         const group = getGroup(str)
         if (group) {
            const category = mainCtx.categoryItems?.find((el: any) => el.id == group.categoryId)
            items.push({ to: category?.ref, label: tt(category?.name, locale) })
            items.push({ to: group.ref, label: tt(group.name, locale) })
         } 
         else {
            const category = getCategory(str)
            if (category) items.push({ to: category?.ref, label: tt(category?.name, locale) })
         }
      }
   }

   function getCategory(str: string) {
      return mainCtx.categoryItems?.find((el: any) => el.ref == str)
   }

   function getGroup(str: string) {
      return mainCtx.groupItems?.find((el: any) => el.ref == str)
   }

   function getSubGroup(str: string) {
      return mainCtx.subgroupItems?.find((el: any) => el.ref == str)
   }

   return (
      <>
         <Breadcrumbs className="breadcrumb-ol" aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/">
               <HomeIcon />
            </Link>
            {getItems().map((item: any, index: number, arr: any) => (
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