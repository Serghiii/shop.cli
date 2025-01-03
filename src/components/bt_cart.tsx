'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const CartQuantity = dynamic(
	() =>
		import('../components/cartquantity').catch(err => {
			// eslint-disable-next-line react/display-name
			return () => <p>{err.message}</p>
		}),
	{ ssr: false }
)

const CartButton: React.FC<any> = props => {
	const actionsCartDropdown = React.useRef<HTMLDivElement>(null)
	const Show: string = 'show'

	const actionsCartMouseEnter = () => {
		actionsCartDropdown.current?.classList.add(Show)
	}

	const actionsCartMouseLeave = () => {
		actionsCartDropdown.current?.classList.remove(Show)
	}

	return (
		<div
			className='actions__cart'
			onClick={props.click}
			onMouseEnter={actionsCartMouseEnter}
			onMouseLeave={actionsCartMouseLeave}
		>
			<i className='actions__cart-icon'></i>
			<CartQuantity />
		</div>
	)
}

export default CartButton
