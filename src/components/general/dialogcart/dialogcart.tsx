'use client'
import { MouseEvent, useRef } from 'react'
import { useDictionary, useMainContext } from '../../../contexts'
import { cn } from '../../../lib/utils'
import DrawCart from './drawcart'

const DialogCart: React.FC = () => {
	const { d } = useDictionary()
	const ctxMain = useMainContext()
	const backdrop = useRef<HTMLDivElement>(null)
	const mouseState = {
		Down: false,
		Up: false
	}

	const dialogBackdropMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLElement).contains(backdrop.current)) {
			mouseState.Down = true
		} else {
			mouseState.Down = false
		}
	}

	const dialogBackdropMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLElement).contains(backdrop.current)) {
			mouseState.Up = true
		} else {
			mouseState.Up = false
		}
	}

	const dialogBackdropClickHandler = (e: MouseEvent<HTMLDivElement>) => {
		if (mouseState.Down && mouseState.Up && (e.target as HTMLElement).contains(backdrop.current)) {
			buttonCloseClickHandler()
		}
	}

	const buttonCloseClickHandler = () => {
		ctxMain.stateCart[1](false)
		document.body.removeAttribute('class')
		ctxMain.mainSwiper.current?.removeAttribute('style')
	}

	return (
		<div
			ref={backdrop}
			className={cn('dialog-wrapper dialog-backdrop', { show: ctxMain.stateCart[0] })}
			onClick={dialogBackdropClickHandler}
			onMouseDown={dialogBackdropMouseDownHandler}
			onMouseUp={dialogBackdropMouseUpHandler}
		>
			<div className='dialog'>
				<div className='dialog-header'>
					<h2 className='dialog-header-title'>{d.cart.title}</h2>
					<svg
						className='bt-close'
						onClick={buttonCloseClickHandler}
						viewBox='0 0 413.348 413.348'
						height='15px'
						width='15px'
					>
						<path d='m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z' />
					</svg>
				</div>
				<DrawCart closeDialog={buttonCloseClickHandler} />
			</div>
		</div>
	)
}

export default DialogCart
