'use client'
import Image from 'next/image'
import Image404 from '../../public/icon/404.svg'
// import { useParams } from 'next/navigation'
// import Head from 'next/head';

const Custom404: React.FC = () => {
	// const { lang } = useParams<{ lang: string }>()

	return (
		<>
			{/* <Head>
            <title>404 Сторінка не знайдена</title>
         </Head> */}
			<html /*lang={lang}*/>
				<body>
					<div className='wrapper'>
						<div className='container-simple'>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
									height: '100%',
									margin: '0'
								}}
							>
								<Image width={500} height={500} src={Image404} alt='' priority={true} />
								<h2 className='paragraf'>{/*d['404'].not_found*/}</h2>
							</div>
							<style jsx>
								{`
									.paragraf {
										margin-top: -25%;
										color: gray;
										text-align: center;
									}
									@media (max-width: 479.98px) {
										.paragraf {
											font-size: 14px;
										}
									}
								`}
							</style>
						</div>
					</div>
				</body>
			</html>
		</>
	)
}

export default Custom404
