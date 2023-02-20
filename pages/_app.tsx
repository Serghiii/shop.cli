import '../styles/styles.scss'
import '../styles/productimages.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/thumbs'
import type { AppProps } from 'next/app'
import React from 'react'
import axios from 'axios'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import { Provider } from 'react-redux'
import { store } from '../redux'
import Head from 'next/head'
import { SWRConfig } from 'swr'

function App({ Component, pageProps }: AppProps) {

  const swrConfig = {
    revalidateOnFocus: false,
    shouldRetryOnError: true
  }

  axios.defaults.baseURL = process.env.API_URL;
  // axios.defaults.headers.common['Accept-Language'] = String(useRouter().locale);

  // axios debugger
  // axios.interceptors.request.use(
  //   (req: any) => {
  //     const today = new Date()
  //     console.log(`${req.method.toUpperCase()} запрос выдправлено по ${req.url} в ${today.getHours()}:${today.getMinutes()}`)
  //     return req
  //   },
  //   (error: any) => {
  //     console.log(error)
  //     return Promise.reject(error)
  //   }
  // )

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.StrictMode>
        <SWRConfig value={swrConfig}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </SWRConfig>
      </React.StrictMode>
    </>
  )
}
export default App