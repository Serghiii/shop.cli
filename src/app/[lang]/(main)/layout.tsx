'use client'
import { useEffect } from 'react'
import { Footer, Header } from '../../../components'
import { useDictionary } from '../../../contexts'

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { d } = useDictionary()

	useEffect(() => {
		document.title = d.title
	}, [, d.title])

	return (
		<div className='wrapper'>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
