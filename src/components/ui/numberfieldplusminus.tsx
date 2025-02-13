import { NumberField } from '@base-ui-components/react/number-field'
import React from 'react'
import { useCartContext } from '../../contexts'
import styles from '../styles/numberfieldplusminus.module.scss'

export default function NumberFieldPlusMinus({ id, value, min, max }: any) {
	const adjustAmount = useCartContext().adjustAmount

	function onClikDecrementHandler(e: React.MouseEvent<HTMLButtonElement>) {
		if (value > 1) {
			adjustAmount({
				id: id,
				amount: value - 1
			})
		}
	}

	function onClikIncrementHandler(e: React.MouseEvent<HTMLButtonElement>) {
		if (value < max) {
			adjustAmount({
				id: id,
				amount: value + 1
			})
		}
	}

	function PlusIcon(props: React.ComponentProps<'svg'>) {
		return (
			<svg width='10' height='10' viewBox='0 0 10 10' fill='none' stroke='currentcolor' strokeWidth='1.6' {...props}>
				<path d='M0 5H5M10 5H5M5 5V0M5 5V10' />
			</svg>
		)
	}

	function MinusIcon(props: React.ComponentProps<'svg'>) {
		return (
			<svg width='10' height='10' viewBox='0 0 10 10' fill='none' stroke='currentcolor' strokeWidth='1.6' {...props}>
				<path d='M0 5H10' />
			</svg>
		)
	}

	function onValueChange(value: number | null) {
		if (!value) return
		if (value < min) {
			adjustAmount({
				id: id,
				amount: 1
			})
		} else if (value > max) {
			adjustAmount({
				id: id,
				amount: max
			})
		} else if (value) {
			adjustAmount({
				id: id,
				amount: value
			})
		}
	}

	return (
		<NumberField.Root
			id={id}
			className={styles.Field}
			value={value}
			min={min}
			max={max}
			onValueChange={onValueChange}
		>
			<NumberField.ScrubArea>
				<NumberField.ScrubAreaCursor />
			</NumberField.ScrubArea>
			<NumberField.Group className={styles.Group}>
				<NumberField.Decrement className={styles.Decrement} onClick={onClikDecrementHandler}>
					<MinusIcon />
				</NumberField.Decrement>
				<NumberField.Input className={styles.Input} />
				<NumberField.Increment className={styles.Increment} onClick={onClikIncrementHandler}>
					<PlusIcon />
				</NumberField.Increment>
			</NumberField.Group>
		</NumberField.Root>
	)
}
