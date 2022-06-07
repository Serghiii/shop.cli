import '../styles/styles.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import type { AppProps } from 'next/app'
import React from 'react'
import axios from 'axios'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { useRouter } from 'next/router'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.API_URL;
  axios.defaults.headers.common['Accept-Language'] = useRouter().locale;

  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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