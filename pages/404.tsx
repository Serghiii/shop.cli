import React from 'react'
import Image from 'next/image';
import { HeaderSimple } from '../components'
import Image404 from '../public/icon/404.svg'
import Head from 'next/head';

const Custom404: React.FC = () => {

   return (
      <>
         <Head>
            <title>404 Сторінка не знайдена</title>
         </Head>
         <div className="wrapper">
            <HeaderSimple />
            <div className="container-simple">
               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", margin: "0" }}>
                  <Image width={500} height={500} src={Image404} alt="" />
                  <h2 className="paragraf">Сторінка не знайдена</h2>
               </div>
               <style jsx>{`
                  .paragraf {
                     margin-top: -25%; 
                     color: gray;
                     text-align: center;
                  }
                  @media (max-width: 479.98px) {
                     .paragraf {
                        font-size:14px;
                     }
                  }
               `}
               </style>
            </div>
         </div >
      </>
   )
}
export default Custom404