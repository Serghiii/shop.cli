import React from "react"
import Head from "next/head"
import { FooterSimple, HeaderSimple } from "./index"

const SimpleLayout: React.FC<any> = ({title, children, footer}) => (
   <>
      <Head>
         <title>{title}</title>
      </Head>
      <div className="wrapper">
         <HeaderSimple />
         {children}
         {footer && <FooterSimple />}
      </div >
   </>
)
export default SimpleLayout