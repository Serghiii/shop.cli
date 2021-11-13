import '../styles/styles.scss'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import { AuthProvider } from '../contexts'
import axios from 'axios'
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head'
import theme from '../src/theme';
import CartProvider from '../contexts/cart-context'

function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.API_URL;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}
export default App