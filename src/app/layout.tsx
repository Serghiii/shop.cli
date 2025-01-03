import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/thumbs'
import { CartProvider, MainProvider } from '../contexts'
import './global.scss'
import { MuiThemeProvider } from './mui.provider'
import './normalize.scss'
import { ReduxProvider } from './redux.provider'
import { SWRProvider } from './swr.provider'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<SWRProvider>
				<ReduxProvider>
					<MuiThemeProvider>
						<CartProvider>
							<MainProvider>{children}</MainProvider>
						</CartProvider>
					</MuiThemeProvider>
				</ReduxProvider>
			</SWRProvider>
		</>
	)
}
