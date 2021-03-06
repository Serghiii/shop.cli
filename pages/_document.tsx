import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
               <meta charSet="utf-8" />
               <link rel="icon" href="/favicon.ico" />
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
               <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap&subset=cyrillic-ext" rel="stylesheet" />
               <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument