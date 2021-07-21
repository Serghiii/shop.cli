import Link from "next/link"
import { Breadcrumbs, Typography } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import React from "react";

const MainBreadcrumbs: React.FC<any> = ({ items }: any) => {
   const count: number = items.length;

   return (
      <>
         <Breadcrumbs className="breadcrumb-ol" aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/">
               <a><HomeIcon /></a>
            </Link>
            {items.map((obj: any, index: number) => (
               index >= count - 1 ? (
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