import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import './global.scss'
import './normalize.scss'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <>{children}</>
}
