import Link from "next/link"
import { Breadcrumbs, Typography } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import React from "react";
import { useRouter } from "next/router";
import { useMainContext } from "../contexts";

const MainBreadcrumbs: React.FC<any> = () => {
   const mainCtx = useMainContext();
   const router = useRouter();

   let items: any = [];
   let parts = router.pathname.split("/");
   const place = parts[parts.length - 1];
   parts = parts.slice(1, parts.length - 1);
   parts.forEach(item => { getItem(item) });
   getItem(place);

   function getItem(str: string) {
      const group = getGroup(str)
      if (group) {
         const category = mainCtx.categoryItems?.find((el: any) => el.id == group.categoryId)
         items.push({ to: category.ref, label: category.name })
         items.push({ to: group.ref, label: group.name })
      } else {
         const category = getCategory(str)
         if (category) items.push({ to: category.ref, label: category.name })
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
               <a><HomeIcon /></a>
            </Link>
            {items?.map((obj: any, index: number, arr: any) => (
               index >= arr.length - 1 ? (
                  <Typography color="textPrimary" key={obj.to}>{obj.label}</Typography>
               ) : (
                  <Link key={obj.to} href={obj.to}>
                     <a>{obj.label}</a>
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