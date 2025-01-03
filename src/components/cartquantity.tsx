'use client'
import { memo, useEffect } from 'react'
import { useCartContext } from '../contexts'
import { reduxHooks } from '../hooks'

const CartQuantity: React.FC<any> = () => {
	const cart = reduxHooks().useCart()
	const cartCtx = useCartContext()

	useEffect(() => {
		// cartCtx.loadCart()
	}, [])

	useEffect(() => {
		console.log('cart ', cartCtx.cart.cartItems, cartCtx.cart.loaded)
	}, [cartCtx.cart.loaded])

	const productsAmount = () => {
		return cart?.cart?.reduce((acc: number, curr: any) => (acc = acc + curr.iamount), 0)
	}

	return (
		<>{cart?.started && cart?.cart?.length > 0 && <div className='actions__cart-amount'>{productsAmount()}</div>}</>
	)
}

export default memo(CartQuantity)
