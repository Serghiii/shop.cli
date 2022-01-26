import '../styles/styles.scss'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import axios from 'axios'
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head'
import theme from '../src/theme';
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.API_URL;

  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App