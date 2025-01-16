import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/thumbs'
import { AuthProvider, CartProvider, MainProvider } from '../contexts'
import { decodePayload } from '../lib/utils'
import './global.scss'
import { MuiThemeProvider } from './mui.provider'
import './normalize.scss'
import { SWRProvider } from './swr.provider'

export async function getSession() {
	const initialState = { isLoggedIn: false, name: '', avatar: '', token: '' }
	const sessionName = 'session'
	const sessionCookies = await cookies()
	if (!sessionCookies.has(sessionName)) return initialState
	const token = sessionCookies.get(sessionName)?.value
	if (!token) return initialState
	const payload = decodePayload((jwtDecode(token) as any).data)
	// setToken(payload.sign)
	return { isLoggedIn: true, name: payload.name, avatar: payload.avatar, token: payload.sign }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<SWRProvider>
				<MuiThemeProvider>
					<AuthProvider auth={await getSession()}>
						<CartProvider>
							<MainProvider>{children}</MainProvider>
						</CartProvider>
					</AuthProvider>
				</MuiThemeProvider>
			</SWRProvider>
		</>
	)
}
