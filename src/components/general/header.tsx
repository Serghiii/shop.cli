'use client'
import { motion, useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuthContext, useMainContext } from '../../contexts'
import { ScreenSize } from '../../lib/enums'
import { cn } from '../../lib/utils'
import {
	CartButton,
	CompareButton,
	Language,
	Logo,
	MenuCategoriesButton,
	MenuSideDrawerButton,
	Phones,
	ProfileButton,
	Search,
	SideDrawer
} from '../general'

const Header: React.FC = () => {
	const { session } = useAuthContext()
	const ctxMain = useMainContext()
	const [stateDarawer, setStateDarawer] = useState<boolean>(false)
	const header = useRef<HTMLDivElement>(null)
	const headerTop = useRef<HTMLDivElement>(null)
	const headerBtm = useRef<HTMLDivElement>(null)
	const paddingTop: string = 'top_padding_top'
	const Fixed: string = 'btm_fixed'
	const _lock: string = '_lock'
	const headerFixed = useRef<boolean>(false)
	const scrollup = useRef<boolean>(false)
	const lockbody = useRef<boolean>(false)
	const isInView = useInView(header, { initial: true, amount: 0.56 })

	useEffect(() => {
		if (isInView) {
			if (headerFixed.current) {
				// fixed header
				headerBtm.current?.classList.remove(Fixed)
				headerFixed.current = false
				headerTop.current?.classList.remove(paddingTop)
			}
			if (scrollup.current && !headerFixed.current) {
				// hide scrollup
				ctxMain.scrollUp.current?.classList.remove('show')
				scrollup.current = false
			}
		} else {
			if (!headerFixed.current) {
				// stiky header
				headerBtm.current?.classList.add(Fixed)
				headerFixed.current = true
				if (isMediumScreen()) headerTop.current?.classList.add(paddingTop)
			}
			if (!scrollup.current && headerFixed.current) {
				// show scrollup
				ctxMain.scrollUp.current?.classList.add('show')
				scrollup.current = true
			}
		}
	}, [isInView])

	const drawerClickHandler = () => {
		// show sidebar
		let padding: string = '0'
		if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
			padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
		}
		setStateDarawer(!stateDarawer)
		document.body.classList.add(_lock)
		lockbody.current = true
		if (ctxMain.mainSwiper.current) ctxMain.mainSwiper.current.style.paddingRight = padding
	}

	const loginClickHandler = () => {
		// dialog login
		if (!session.isLoggedIn) {
			let padding = '0'
			if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
				padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
			}
			ctxMain.stateLogin[1](true)
			document.body.classList.add(_lock)
			if (ctxMain.mainSwiper.current) ctxMain.mainSwiper.current.style.paddingRight = padding
		}
	}

	const cartClickHandler = () => {
		// authorization
		let padding: string = '0'
		if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
			padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
		}
		ctxMain.stateCart[1](true)
		document.body.classList.add(_lock)
		if (ctxMain.mainSwiper.current) ctxMain.mainSwiper.current.style.paddingRight = padding
	}

	const menuBackdropClickHandler = () => {
		// hide sidebar
		setStateDarawer(false)
		document.body.removeAttribute('class')
		lockbody.current = false
		ctxMain.mainSwiper.current?.removeAttribute('style')
	}

	const showCategoryes = useCallback(
		(show: boolean) => {
			if (show && !ctxMain.stateCategory[0]) {
				ctxMain.stateCategory[1](show)
			} else if (!show && ctxMain.stateCategory[0]) {
				ctxMain.stateCategory[1](show)
			}
		},
		[ctxMain.stateCategory]
	)

	const changeWindowSize = useCallback(() => {
		// screen lock
		if (window.innerWidth > ScreenSize.Medium) {
			// show categories
			ctxMain.stateCategory[1](true)
			if (lockbody.current) {
				document.body.classList.remove(_lock)
				lockbody.current = false
			}
		} else {
			// hide categories
			ctxMain.stateCategory[1](false)
			if (stateDarawer && !lockbody.current) {
				document.body.classList.add(_lock)
				lockbody.current = true
			}
		}
	}, [ctxMain.stateCategory, stateDarawer])

	function isMediumScreen() {
		if (window.innerWidth <= ScreenSize.Medium) {
			return false
		}
		return true
	}

	useEffect(() => {
		window.addEventListener('resize', changeWindowSize)
		if (window.innerWidth > ScreenSize.Medium) {
			// show categories
			ctxMain.stateCategory[1](true)
		} else {
			// hide categories
			ctxMain.stateCategory[1](false)
		}
		return () => {
			window.removeEventListener('resize', changeWindowSize)
		}
	}, [, ctxMain.stateCategory, showCategoryes, changeWindowSize])

	return (
		<motion.header ref={header}>
			<div className='wraper-top'>
				<div className='container'>
					<div ref={headerTop} className='header-top'>
						<div className='top-left'>
							<Logo />
							<Phones />
						</div>
						<div className='top-right'>
							<Language />
						</div>
					</div>
				</div>
			</div>
			<div ref={headerBtm} className='wraper-btm'>
				<div className='container'>
					<div className='header-btm'>
						<MenuCategoriesButton />
						<MenuSideDrawerButton click={drawerClickHandler} />
						<Logo />
						<Search />
						<div className='actions'>
							<ProfileButton click={loginClickHandler} />
							<CompareButton />
							<CartButton click={cartClickHandler} />
						</div>
					</div>
					<SideDrawer show={stateDarawer} />
					<div className={cn('menu-backdrop', { show: stateDarawer })} onClick={menuBackdropClickHandler}></div>
				</div>
			</div>
		</motion.header>
	)
}

export default Header
