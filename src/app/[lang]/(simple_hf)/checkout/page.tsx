'use client'
import { MainCheckout } from '../../../../components'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../redux'
import { useRouter } from 'next/navigation'
import { useDictionary } from '../../../../contexts'

export default function Checkout() {
	const router = useRouter()
	const { d } = useDictionary()
	const [showing, setShowing] = useState(false)
	const cart = useAppSelector((state: any) => state.cart)

	useEffect(() => {
		document.title = d.title
		setShowing(true)
	}, [])

	if (!showing) return null

	if (showing && cart.cart.length == 0) {
		router.push('/')
		return <></>
	}

	return <MainCheckout />
}
