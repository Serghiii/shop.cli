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
	return (
		<div className='actions__cart' onClick={props.click}>
			<i className='actions__cart-icon'></i>
			<CartQuantity />
		</div>
	)
}

export default CartButton
