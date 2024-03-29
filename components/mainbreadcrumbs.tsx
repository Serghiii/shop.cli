import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeIcon from '@mui/icons-material/Home'
import React from "react"
import { useRouter } from "next/router"
import { useMainContext } from "../contexts"
import Link from "next/link"

const MainBreadcrumbs: React.FC<any> = ({ isProduct = false }) => {
   const mainCtx = useMainContext()
   const router = useRouter()

   let items: any = []
   let parts = router.pathname.split("/")
   const place = parts[parts.length - 1]
   parts = parts.slice(1, parts.length - 1)
   parts.forEach(item => { getItem(item) })
   getItem(place)

   function getItem(str: string) {
      const group = getGroup(str)
      if (group) {
         const category = mainCtx.categoryItems?.find((el: any) => el.id == group.categoryId)
         items.push({ to: category?.ref, label: router.locale == 'ru' ? category?.name_ru : category?.name })
         items.push({ to: group.ref, label: router.locale == 'ru' ? group.name_ru : group.name })
      } else {
         const category = getCategory(str)
         if (category) items.push({ to: category?.ref, label: router.locale == 'ru' ? category?.name_ru : category?.name })
      }
   }

   function getCategory(str: string) {
      return mainCtx.categoryItems?.find((el: any) => el.ref == str)
   }

   function getGroup(str: string) {
      return mainCtx.groupItems?.find((el: any) => el.ref == str)
   }

   return (
      <>
         <Breadcrumbs className="breadcrumb-ol" aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/">
               <HomeIcon />
            </Link>
            {items?.map((item: any, index: number, arr: any) => (
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