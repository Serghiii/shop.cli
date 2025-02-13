'use client'
import { useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ProductImages: React.FC<any> = ({ id, data }) => {
	const [active, setActive] = useState(data[0])

	const getActive = (str: string) => {
		const res = str.split('size_150/')[1]?.split('"')[0]
		if (res !== undefined) setActive(res)
	}

	const onMouseEnterHandler = (e: any) => {
		getActive(e.target.innerHTML)
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<div
					style={{
						width: '370px',
						padding: '20px'
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 20px 0' }}>
						<InnerImageZoom
							src={`${process.env.STATIC_URL}/cards/${id}/images/size_800/${active}`}
							zoomScale={2}
							hasSpacer={true}
							zoomType={'click'}
							hideHint={true}
						/>
					</div>
					<Swiper
						direction='horizontal'
						spaceBetween={10}
						navigation={true}
						slidesPerView={5}
						modules={[Navigation, Pagination]}
						className='product-images-slider'
					>
						{data.map((item: any, index: number) => (
							<SwiperSlide
								key={index}
								className={active == item ? 'selected' : ''}
								onMouseEnter={onMouseEnterHandler}
							>
								<div className='product-images-slider-wrapper'>
									<img
										src={`${process.env.STATIC_URL}/cards/${id}/images/size_150/${item}`}
										alt='product images'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	)
}

export default ProductImages
