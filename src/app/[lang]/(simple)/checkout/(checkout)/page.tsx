'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MainCheckout } from '../../../../../components'
import { useCartContext } from '../../../../../contexts'

export default function Checkout() {
	const router = useRouter()
	const [show, setShowing] = useState(false)
	const cartItems = useCartContext().cart

	useEffect(() => {
		if (cartItems.length == 0) {
			router.push('/')
		} else setShowing(true)
	}, [cartItems, router])

	return <>{show && <MainCheckout />}</>
}
