'use client'
import { useRouter } from 'next/navigation'
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
// const ProfileButton = dynamic(
// 	() =>
// 		import('../components/bt_profile').catch(err => {
// 			// eslint-disable-next-line react/display-name
// 			return () => <p>{err.message}</p>
// 		}),
// 	{ ssr: false }
// )

const Header: React.FC = () => {
	const session = useAuthContext().session
	const mainCtx = useMainContext()
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
	const router = useRouter()

	const drawerClickHandler = () => {
		// показ бокової панелі
		let padding: string = '0'
		if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
			padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
		}
		setStateDarawer(!stateDarawer)
		document.body.classList.add(_lock)
		lockbody.current = true
		if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding
	}

	const loginClickHandler = () => {
		// логін діалог
		if (!session.isLoggedIn) {
			let padding = '0'
			if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
				padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
			}
			mainCtx.stateLogin[1](true)
			document.body.classList.add(_lock)
			if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding
		}
	}

	const cartClickHandler = () => {
		// авторизація
		let padding: string = '0'
		if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
			padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
		}
		mainCtx.stateCart[1](true)
		document.body.classList.add(_lock)
		if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding
	}

	const menuBackdropClickHandler = () => {
		// приховування бокової панелі
		setStateDarawer(false)
		document.body.removeAttribute('class')
		lockbody.current = false
		mainCtx.mainSwiper.current?.removeAttribute('style')
	}

	const showCategoryes = useCallback(
		(show: boolean) => {
			if (show && !mainCtx.stateCategory[0]) {
				mainCtx.stateCategory[1](show)
			} else if (!show && mainCtx.stateCategory[0]) {
				mainCtx.stateCategory[1](show)
			}
		},
		[mainCtx.stateCategory]
	)

	const changeWindowSize = useCallback(() => {
		// блокування екрану
		if (window.innerWidth > lg) {
			mainCtx.stateCategory[1](true)
			if (lockbody.current) {
				document.body.classList.remove(_lock)
				lockbody.current = false
			}
		} else {
			mainCtx.stateCategory[1](false)
			if (stateDarawer && !lockbody.current) {
				document.body.classList.add(_lock)
				lockbody.current = true
			}
		}
	}, [mainCtx.stateCategory, stateDarawer])

	function isLargeScreen() {
		let res = true
		if (window.innerWidth <= lg) {
			res = false
		}
		return res
	}

	const scrollWindow = useCallback(() => {
		// фіксація шапки
		if (!hdFixed.current && window.scrollY > (hdBtm.current?.offsetTop || 0)) {
			// зафіксувати шапку
			hdBtm.current?.classList.add(Fixed)
			hdFixed.current = true
			if (isLargeScreen()) hdTop.current?.classList.add(paddingTop)
		} else if (hdFixed.current && window.scrollY - (isLargeScreen() ? hdTop.current?.clientHeight || 0 : 0) <= 0) {
			// зняти фіксацію шапки
			hdBtm.current?.classList.remove(Fixed)
			hdFixed.current = false
			hdTop.current?.classList.remove(paddingTop)
		}
		// показати/сховати кнопку наверх
		if (!scrollup.current && hdFixed.current) {
			mainCtx.scrollUp.current?.classList.add('show')
			scrollup.current = true
		} else if (scrollup.current && !hdFixed.current) {
			mainCtx.scrollUp.current?.classList.remove('show')
			scrollup.current = false
		}
	}, [mainCtx.scrollUp])

	useEffect(() => {
		window.addEventListener('resize', changeWindowSize)
		window.addEventListener('scroll', scrollWindow)
		if (window.innerWidth > lg) {
			mainCtx.stateCategory[1](true)
		} else {
			mainCtx.stateCategory[1](false)
		}
		return () => {
			window.removeEventListener('resize', changeWindowSize)
			window.removeEventListener('scroll', scrollWindow)
		}
	}, [, mainCtx.stateCategory, showCategoryes, changeWindowSize, scrollWindow])

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
					<div className={`menu-backdrop${stateDarawer ? ' show' : ''}`} onClick={menuBackdropClickHandler}></div>
				</div>
			</div>
		</header>
	)
}

export default Header
