'use client'
import React, { Dispatch, RefObject, SetStateAction, useContext, useRef, useState } from 'react'

interface IStore {
	stateCart: [boolean, Dispatch<SetStateAction<boolean>>]
	Categories: RefObject<HTMLDivElement | null>
	mainSwiper: RefObject<HTMLDivElement | null>
	scrollUp: RefObject<HTMLDivElement | null>
}

const MainContext = React.createContext<IStore | undefined>(undefined)
type Props = {
	children?: React.ReactNode
}
const MainProvider: React.FC<Props> = ({ children }) => {
	const [stateCart, setStateCart] = useState<boolean>(false) // стан для категорій
	const Categories = useRef<HTMLDivElement>(null)
	const mainSwiper = useRef<HTMLDivElement>(null)
	const scrollUp = useRef<HTMLDivElement>(null)

	const store: IStore = {
		stateCart: [stateCart, setStateCart],
		Categories: Categories,
		mainSwiper: mainSwiper,
		scrollUp: scrollUp
	}
	return <MainContext value={store}>{children}</MainContext>
}

export const useMainContext = () => {
	const mainContext = useContext(MainContext)
	if (!mainContext) {
		throw new Error('useMainContext must be used within the MainContext.Provider')
	}
	return mainContext
}

export default MainProvider
