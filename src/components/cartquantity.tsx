'use client'
import { useCartContext } from '../contexts'

const CartQuantity: React.FC<any> = () => {
	const cart = useCartContext().cart

	const productsAmount = () => {
		return cart.reduce((acc: number, curr: any) => (acc = acc + curr.amount), 0)
	}

	return <>{cart.length > 0 && <div className='actions__cart-amount'>{productsAmount()}</div>}</>
}

export default CartQuantity
