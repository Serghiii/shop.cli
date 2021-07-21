import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import slide1 from '../public/img/swiper/slide-1.png'
import slide2 from '../public/img/swiper/slide-2.png'
import slide3 from '../public/img/swiper/slide-3.png'
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Slider: React.FC = () => {
   return (
      <Swiper
         spaceBetween={2}
         navigation
         pagination={{ clickable: true }}
         loop={true}
         autoplay={{
            delay: 30000,
            disableOnInteraction: true
         }}
      >
         <SwiperSlide><div className="image_bk"><Image src={slide1} alt="" /></div></SwiperSlide>
         <SwiperSlide><div className="image_bk"><Image src={slide2} alt="" /></div></SwiperSlide>
         <SwiperSlide><div className="image_bk"><Image src={slide3} alt="" /></div></SwiperSlide>
      </Swiper>
   )
}

export default Slider