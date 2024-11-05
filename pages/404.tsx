'use client'
import Image from 'next/image';
import { HeaderSimple } from '../components'
import Image404 from '../public/icon/404.svg'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { translate } from '../locales/translate';

const Custom404: React.FC = () => {
   const { locale } = useRouter()

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
                  <h2 className="paragraf">{translate('404.not_found', locale)}</h2>
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