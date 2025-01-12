'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MainCheckout } from '../../../../components'
import { useCartContext, useDictionary } from '../../../../contexts'

export default function Checkout() {
	const router = useRouter()
	const { d } = useDictionary()
	const [show, setShowing] = useState(false)
	const cartItems = useCartContext().cart

	useEffect(() => {
		document.title = d.title
		if (cartItems.length == 0) {
			router.push('/')
		} else setShowing(true)
	}, [d.title])

	if (!show) return null

	return <MainCheckout />
}
