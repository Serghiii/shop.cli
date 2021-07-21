import '../styles/styles.scss'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import { AuthProvider } from '../contexts'
import axios from 'axios'
import { ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import theme from '../src/theme';

function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.API_URL;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}
export default App