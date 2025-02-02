'use client'
import cn from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuthContext, useMainContext } from '../contexts'
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
} from './index'

const Header: React.FC = () => {
	const session = useAuthContext().session
	const ctxMain = useMainContext()
	const [stateDarawer, setStateDarawer] = useState<boolean>(false)
	const hdTop = useRef<HTMLDivElement>(null)
	const hdBtm = useRef<HTMLDivElement>(null)
	const lg: number = 991.98
	const paddingTop: string = 'top_padding_top'
	const Fixed: string = 'btm_fixed'
	const _lock: string = '_lock'
	const hdFixed = useRef<boolean>(false)
	const scrollup = useRef<boolean>(false)
	const lockbody = useRef<boolean>(false)

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
		if (window.innerWidth > lg) {
			ctxMain.stateCategory[1](true)
			if (lockbody.current) {
				document.body.classList.remove(_lock)
				lockbody.current = false
			}
		} else {
			ctxMain.stateCategory[1](false)
			if (stateDarawer && !lockbody.current) {
				document.body.classList.add(_lock)
				lockbody.current = true
			}
		}
	}, [ctxMain.stateCategory, stateDarawer])

	function isLargeScreen() {
		let res = true
		if (window.innerWidth <= lg) {
			res = false
		}
		return res
	}

	const scrollWindow = useCallback(() => {
		// header fixation
		if (!hdFixed.current && window.scrollY > (hdBtm.current?.offsetTop || 0)) {
			// freeze the header
			hdBtm.current?.classList.add(Fixed)
			hdFixed.current = true
			if (isLargeScreen()) hdTop.current?.classList.add(paddingTop)
		} else if (hdFixed.current && window.scrollY - (isLargeScreen() ? hdTop.current?.clientHeight || 0 : 0) <= 0) {
			// unfreeze the header
			hdBtm.current?.classList.remove(Fixed)
			hdFixed.current = false
			hdTop.current?.classList.remove(paddingTop)
		}
		// show/hide up button
		if (!scrollup.current && hdFixed.current) {
			ctxMain.scrollUp.current?.classList.add('show')
			scrollup.current = true
		} else if (scrollup.current && !hdFixed.current) {
			ctxMain.scrollUp.current?.classList.remove('show')
			scrollup.current = false
		}
	}, [ctxMain.scrollUp])

	useEffect(() => {
		window.addEventListener('resize', changeWindowSize)
		window.addEventListener('scroll', scrollWindow)
		if (window.innerWidth > lg) {
			ctxMain.stateCategory[1](true)
		} else {
			ctxMain.stateCategory[1](false)
		}
		return () => {
			window.removeEventListener('resize', changeWindowSize)
			window.removeEventListener('scroll', scrollWindow)
		}
	}, [, ctxMain.stateCategory, showCategoryes, changeWindowSize, scrollWindow])

	return (
		<header>
			<div className='wraper-top'>
				<div className='container'>
					<div ref={hdTop} className='header-top'>
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
			<div ref={hdBtm} className='wraper-btm'>
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
		</header>
	)
}

export default Header
