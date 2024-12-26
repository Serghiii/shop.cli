'use client'
import { useDictionary } from '../contexts'

const FooterSimple: React.FC = () => {
	const { d } = useDictionary()
	return (
		<footer>
			<div className='wraper-footer-simple'>
				<div className='container-simple'>
					<div className='footer-simple'>
						<p>{d.footer.title}</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default FooterSimple
