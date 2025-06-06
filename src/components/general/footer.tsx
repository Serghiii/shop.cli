'use client'
import { useDictionary, useMainContext } from '../../contexts'
import { DialogCart, DialogLogin } from '../general'

const Footer: React.FC = () => {
	const ctxMain = useMainContext()
	const { d } = useDictionary()

	const scrollUpClickHandler = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}
	return (
		<>
			<footer>
				<div className='wraper-footer'>
					<div className='container'>
						<div className='footer'>
							<p>{d.footer.title}</p>
							{/* <div className="widget">
                        <div className="evic-box">
                           <Logo />
                        </div>
                     </div> */}
							<span ref={ctxMain.scrollUp} className='scroll-up' onClick={scrollUpClickHandler}>
								<svg className='icon-up-arrow' viewBox='0 0 6 9'>
									<path
										d='M0 0.7L3.5 4.4L0 8.4L0.8 9L5 4.4L0.8 0L0 0.7Z'
										transform='translate(0.994141)'
									></path>
								</svg>
							</span>
						</div>
					</div>
				</div>
			</footer>
			{ctxMain.stateLogin[0] && <DialogLogin />}
			{ctxMain.stateCart[0] && <DialogCart />}
		</>
	)
}

export default Footer
