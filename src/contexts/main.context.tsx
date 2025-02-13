'use client'
import { createContext, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useRef, useState } from 'react'

interface IStore {
	stateLogin: [boolean, Dispatch<SetStateAction<boolean>>]
	stateCart: [boolean, Dispatch<SetStateAction<boolean>>]
	stateCategory: [boolean, Dispatch<SetStateAction<boolean>>]
	mainSwiper: RefObject<HTMLDivElement | null>
	scrollUp: RefObject<HTMLDivElement | null>
}

const MainContext = createContext<IStore | undefined>(undefined)
type Props = {
	children?: ReactNode
}
const MainProvider: React.FC<Props> = ({ children }) => {
	const [stateLogin, setStateLogin] = useState<boolean>(false) // стан для логін форми
	const [stateCart, setStateCart] = useState<boolean>(false) // стан для корзини
	const [stateCategory, setStateCategory] = useState<boolean>(false) // стан для категорії
	const mainSwiper = useRef<HTMLDivElement>(null)
	const scrollUp = useRef<HTMLDivElement>(null)

	const store: IStore = {
		stateLogin: [stateLogin, setStateLogin],
		stateCart: [stateCart, setStateCart],
		stateCategory: [stateCategory, setStateCategory],
		mainSwiper: mainSwiper,
		scrollUp: scrollUp
	}
	return <MainContext value={store}>{children}</MainContext>
}

export const useMainContext = () => {
	const mainContext = useContext(MainContext)
	if (!mainContext) {
		throw new Error('useMainContext must be used within the MainProvider')
	}
	return mainContext
}

export default MainProvider
