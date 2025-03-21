'use client'
import React from 'react'
import { useDictionary } from '../../contexts'
import { Logo } from '../general'
// import Image from 'next/image';
// import Phone from '../public/icon/telephone.svg'

const HeaderSimple: React.FC = () => {
	const { d } = useDictionary()

	return (
		<header>
			<div className='wraper-top-simple'>
				<div className='container-simple'>
					<div className='header-simple'>
						<div className='top-left'>
							<Logo />
						</div>
						<div className='top-right'>
							<div className='contact-simple'>
								<p>{d.support}</p>
								<a href='tel:+380633821947'>(063) 382-19-47</a>
							</div>
							{/* <div className="contact-simple-phone">
                        <a href="tel:+380633821947">
                           <div className="phone-simple">
                              <Image src={Phone} alt="" />
                           </div>
                        </a>
                     </div> */}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default HeaderSimple
