import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/thumbs'
import './global.scss'
import './normalize.scss'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <>{children}</>
}
