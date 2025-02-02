'use client'
import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react'
import { decryptString, encryptString } from '../lib/crypto'
import { fetchService } from '../services'

interface BaseCart {
	id: number
	amount: number
}

interface Cart extends BaseCart {
	code: number
	name: string
	amount_max: number
	price: number
	priceold: number
	dcount: number
	dpercent: number
	pic: string
	firm: { id: number }
}

enum CartActionKind {
	ADD_ITEM = 'ADD_ITEM',
	ADJUST_AMOUNT = 'ADJUST_AMOUNT',
	REMOVE_ITEM = 'REMOVE_ITEM',
	UPDATE_ITEMS = 'UPDATE_ITEMS'
}

interface CartAction {
	type: CartActionKind
	payload: Cart | Cart[] | BaseCart | number
}

const getIDs: any = (val: any) => {
	let data: number[] = []
	val.forEach((el: any) => {
		data.push(el.id)
	})
	return { data }
}

const loadCartFromLocalStorage = () => {
	try {
		const encryptedCart = localStorage.getItem('cart')
		if (encryptedCart) {
			const cartString = decryptString(encryptedCart)
			return JSON.parse(cartString)
		}
	} catch {}
	return []
}

const saveCartToLocalStorage = (cartItems: Cart[]) => {
	const cartString = JSON.stringify(cartItems.map((item: Cart) => ({ ...item })))
	const encryptedCart = encryptString(cartString)
	localStorage.setItem('cart', encryptedCart)
}

const MAX_AMOUNT_PER_ITEM = 99
const initialState: Cart[] = loadCartFromLocalStorage()

const cartReducer = (state: Cart[], action: CartAction) => {
	switch (action.type) {
		case 'ADD_ITEM':
			const entry = state.find((item: any) => item.id === (action.payload as Cart).id)
			if (entry) {
				state = state.map((item: any) => {
					if (item.id === (action.payload as Cart).id) {
						return {
							...item,
							amount: Math.min(item.amount + 1, Math.min(item.amount_max, MAX_AMOUNT_PER_ITEM))
						}
					}
					return item
				})
				saveCartToLocalStorage(state)
				return state
			}
			state = [
				...state,
				{
					...(action.payload as Cart),
					amount: 1
				}
			]
			saveCartToLocalStorage(state)
			return state
		case 'ADJUST_AMOUNT':
			state = state.map((item: any) => {
				if (item.id === (action.payload as BaseCart).id) {
					return {
						...item,
						amount: Math.min((action.payload as BaseCart).amount, MAX_AMOUNT_PER_ITEM)
					}
				}
				return item
			})
			saveCartToLocalStorage(state)
			return state
		case 'REMOVE_ITEM':
			state = state.filter((item: any) => item.id !== action.payload)
			saveCartToLocalStorage(state)
			return state
		case 'UPDATE_ITEMS':
			const modifiedPayload = (action.payload as Cart[]).map((item: Cart) => ({
				...item,
				amount_max: item.amount
			}))
			state = modifiedPayload.map((payloadItem: Cart) => ({
				...payloadItem,
				amount: state.find((cartItem: Cart) => cartItem.id === payloadItem.id)?.amount || 0
			}))
			return state
		default:
			return state
	}
}

interface IStore {
	cart: Cart[]
	addItem: (product: Cart) => void
	adjustAmount: (product: BaseCart) => void
	removeItem: (id: number) => void
}

const CartContext = createContext<IStore | undefined>(undefined)
type Props = {
	children?: ReactNode
}
const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState)
	const addItem = (data: Cart) => dispatch({ type: CartActionKind.ADD_ITEM, payload: data })
	const adjustAmount = (data: BaseCart) => dispatch({ type: CartActionKind.ADJUST_AMOUNT, payload: data })
	const removeItem = (id: number) => dispatch({ type: CartActionKind.REMOVE_ITEM, payload: id })
	const updateCart = () => {
		if (state.length > 0) {
			// sync products
			fetchService
				.post('products/cart', getIDs(state))
				.then(responce => responce.json())
				.then(data => dispatch({ type: CartActionKind.UPDATE_ITEMS, payload: data }))
				.catch()
		}
	}

	useEffect(() => {
		updateCart()
	}, [])

	const store: IStore = {
		cart: state,
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
