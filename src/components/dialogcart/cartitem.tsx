import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import { MoneyFormat } from '..'
import { useCartContext } from '../../contexts'
import { tt } from '../../lib/utils'

const CartItem: React.FC<any> = ({ data, locale }) => {
	const adjustAmount = useCartContext().adjustAmount
	const removeItem = useCartContext().removeItem

	const onChangeCountHandler = (e: any) => {
		if (e.target.value <= 0) e.target.value = 1
		if (e.target.value > data.amount_max) e.target.value = data.amount
		const val: number = e.target.value
		adjustAmount({ id: data.id, amount: val })
	}

	const onClickHandle = (e: any) => {
		removeItem(data.id)
	}

	return (
		<>
			<div className='cart-row'>
				<div className='cart-row__img-range'>
					<img
						className='cart-row__img'
						src={data.id ? `${process.env.STATIC_URL}/cards/${data.id}/${data.pic}` : ''}
						alt=''
					/>
				</div>
				<div style={{ flex: '1' }}>
					<p>{tt(data.name, locale)}</p>
					<p>Код: {data.code}</p>
					<MoneyFormat {...{ value: data.price, className: 'price-value' }} />
				</div>
				<input
					type='number'
					className='cart-row__inpit-amount'
					autoComplete='off'
					min='1'
					max={data.amount_max}
					defaultValue={data.amount}
					onChange={onChangeCountHandler}
				/>
				<div>
					<MoneyFormat
						{...{
							value:
								data.amount >= data.dcount
									? data.price * data.amount - (data.price * data.amount * data.dpercent) / 100
									: data.price * data.amount,
							className: 'price-value'
						}}
					/>
				</div>
				<div>
					<IconButton aria-label='delete' component='span' disableRipple={false} onClick={onClickHandle}>
						<DeleteForeverIcon color='action' />
					</IconButton>
				</div>
			</div>
		</>
	)
}

export default React.memo(CartItem)
