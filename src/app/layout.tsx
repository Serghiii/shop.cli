import { SWRProvider } from './swr-provider'
import { ReduxProvider } from './redux-provider'
import { Roboto } from 'next/font/google'
import './normalize.scss'
import './global.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/thumbs'
import { MuiThemeProvider } from './mui-provider'

const inter = Roboto({subsets:["latin"], weight:["400"]})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <SWRProvider>
                <ReduxProvider>
                    <MuiThemeProvider>
                        {children}
                    </MuiThemeProvider>
                </ReduxProvider>
            </SWRProvider>
        </body>
        </html>
    )
}
  