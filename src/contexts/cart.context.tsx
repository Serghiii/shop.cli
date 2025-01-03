'use client'
import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react'
import { axiosService } from '../services'

interface LocalStorageCart {
	id: number
	amount: number
}

interface Cart extends LocalStorageCart {
	code: number
	name: string
	iamount: number
	price: number
	priceold: number
	dcount: number
	dpercent: number
	pic: string
	firm: { id: number }
}

interface CartState {
	cartItems: Cart[] | LocalStorageCart[]
	loaded: boolean
	// loading: boolean
	// error: Error | null
}

interface Error {
	code?: string
	message: string
}

enum CartActionKind {
	ADD_ITEM = 'ADD_ITEM',
	ADJUST_AMOUNT = 'ADJUST_AMOUNT',
	REMOVE_ITEM = 'REMOVE_ITEM',
	LOAD_ITEMS = 'LOAD_ITEMS'
}

interface CartAction {
	type: CartActionKind
	payload: any //Cart | Cart[]
}

const cartFromStorage = (): LocalStorageCart[] => {
	const cart: string | null = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
	return cart ? JSON.parse(cart) : []
}

const MAX_AMOUNT_PER_ITEM = 99
const initialState: CartState = {
	cartItems: cartFromStorage(),
	loaded: false
	// loading: false,
	// error: null
}

const cartReducer = (state: CartState, action: CartAction) => {
	switch (action.type) {
		case 'ADD_ITEM':
			const entry = state.cartItems.find((item: any) => item.id === action.payload.id)
			if (entry) {
				return {
					...state,
					cartItems: state.cartItems.map((item: any) => {
						if (item.id === action.payload.id) {
							return {
								...item,
								iamount: Math.min(item.iamount + 1, MAX_AMOUNT_PER_ITEM)
							}
						}
						return item
					})
				}
			}
		case 'ADJUST_AMOUNT':
			state.cartItems = state.cartItems.map((item: any) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						iamount: Math.min(action.payload.amount, MAX_AMOUNT_PER_ITEM)
					}
				}
				return item
			})
			localStorage.setItem(
				'cart',
				JSON.stringify(
					state.cartItems.map((item: any) => {
						return { id: item.id, amount: item.iamount }
					})
				)
			)
			return state
		case 'REMOVE_ITEM':
			let cartState: CartState = state
			cartState.cartItems = state.cartItems.filter((item: any) => item.id !== action.payload)
			localStorage.setItem(
				'cart',
				JSON.stringify(
					cartState.cartItems.map((item: any) => {
						return { id: item.id, amount: item.iamount }
					})
				)
			)
			return cartState
		case 'LOAD_ITEMS':
			state.cartItems = action.payload.map((item1: Cart) => ({
				...item1,
				iamount: state.cartItems.find((item2: LocalStorageCart) => item2.id === item1.id)?.amount
			}))
			state.loaded = true
			return { ...state }
		default:
			return state
	}
}

const getIDs: any = (val: any) => {
	let data: number[] = []
	val.forEach((el: any) => {
		data.push(el.id)
	})
	return { data }
}

// const LoadCart = (state: CartState, loadItems: (products: Cart[]) => void) => {
// 	const { data } = useSWRPost('products/cart', getIDs(state.cartItems), {
// 		revalidateOnFocus: false,
// 		shouldRetryOnError: true
// 	})
// 	if (data) loadItems(data)
// }

interface IStore {
	cart: CartState
	addItem: (product: Cart) => void
	adjustAmount: (product: Cart) => void
	removeItem: (product: Cart) => void
}

const CartContext = createContext<IStore | undefined>(undefined)
type Props = {
	children?: ReactNode
}
const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState)
	const addItem = (data: Cart) => dispatch({ type: CartActionKind.ADD_ITEM, payload: data })
	const adjustAmount = (data: Cart) => dispatch({ type: CartActionKind.ADJUST_AMOUNT, payload: data })
	const removeItem = (data: Cart) => dispatch({ type: CartActionKind.REMOVE_ITEM, payload: data })
	const loadCart = () => {
		axiosService
			.post('products/cart', getIDs(state.cartItems))
			.then(({ data }) => dispatch({ type: CartActionKind.LOAD_ITEMS, payload: data }))
	}

	useEffect(() => {
		if (!state.loaded) loadCart()
	}, [])

	const store: IStore = {
		cart: { ...state },
		addItem,
		adjustAmount,
		removeItem
	}
	return <CartContext value={store}>{children}</CartContext>
}

export const useCartContext = () => {
	const cartContext = useContext(CartContext)
	if (!cartContext) {
		throw new Error('useCartContext must be used within the CartContext.Provider')
	}
	return cartContext
}

export default CartProvider
