import React from "react"
import Head from "next/head"
import { FooterSimple, HeaderSimple } from "./index"

const SimpleLayout: React.FC<any> = props => (
   <>
      <Head>
         <title>{props.title}</title>
      </Head>
      <div className="wrapper">
         <HeaderSimple />
         {props.children}
         {props.footer && <FooterSimple />}
      </div >
   </>
)
export default SimpleLayout