import { HeaderSimple } from '../../../components'

export default function SimpleLayout_H({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='wrapper'>
			<HeaderSimple />
			<main>{children}</main>
		</div>
	)
}
