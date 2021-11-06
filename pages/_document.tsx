import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';
import React from 'react';

class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <meta name="theme-color" content={theme.palette.primary.main} />
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

MyDocument.getInitialProps = async (ctx) => {
   // Resolution order
   //
   // On the server:
   // 1. app.getInitialProps
   // 2. page.getInitialProps
   // 3. document.getInitialProps
   // 4. app.render
   // 5. page.render
   // 6. document.render
   //
   // On the server with error:
   // 1. document.getInitialProps
   // 2. app.render
   // 3. page.render
   // 4. document.render
   //
   // On the client
   // 1. app.getInitialProps
   // 2. page.getInitialProps
   // 3. app.render
   // 4. page.render

   // Render app and page and get the context of the page with collected side effects.
   const sheets = new ServerStyleSheets();
   const originalRenderPage = ctx.renderPage;

   ctx.renderPage = () =>
      originalRenderPage({
         // eslint-disable-next-line react/display-name
         enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

   const initialProps = await Document.getInitialProps(ctx);

   return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
   };
};