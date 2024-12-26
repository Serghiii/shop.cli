import { HeaderSimple, FooterSimple } from '../../../components'

export default function SimpleLayout_HF({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='wrapper'>
			<HeaderSimple />
			{children}
			<FooterSimple />
		</div>
	)
}
