'use client'
import dynamic from 'next/dynamic'
import { Slider } from '../../../components'
import { useMainContext } from '../../../contexts'
const Categories = dynamic(
	() =>
		import('../../../components/categiries').catch(err => {
			// eslint-disable-next-line react/display-name
			return () => <p>{err.message}</p>
		}),
	{ ssr: false }
)
const NewGoods = dynamic(
	() =>
		import('./../../../components/newgoods').catch(err => {
			// eslint-disable-next-line react/display-name
			return () => <p>{err.message}</p>
		}),
	{ ssr: false }
)

export default function Home() {
	const ctxMain = useMainContext()

	return (
		<main>
			<div className='container'>
				<div className='main'>
					<Categories show={ctxMain.stateCategory[0]} />
					<div className='menu-backdrop'></div>
					<div ref={ctxMain.mainSwiper} className='main-swiper'>
						<Slider />
					</div>
					<div className='main-sections'>
						<section className='main-new-goods'>
							<NewGoods />
						</section>
					</div>
				</div>
			</div>
		</main>
	)
}
