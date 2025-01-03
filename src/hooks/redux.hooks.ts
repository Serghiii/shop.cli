import { GetCartAction, useAppDispatch, useAppSelector } from '../redux'

export const reduxHooks = () => {
	const useCart = () => {
		const cart = useAppSelector((state: any) => state.cart)
		const dispatch = useAppDispatch()
		if (!cart.started) dispatch(GetCartAction(cart))
		return cart
	}

	return { useCart }
}
