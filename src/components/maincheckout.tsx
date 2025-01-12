'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import * as yup from 'yup'
import { MoneyFormat } from '.'
import { useCartContext, useDictionary } from '../contexts'
import { Masks } from '../lib/masks'
import { tt } from '../lib/utils'
import { axiosService } from '../services'

interface Details {
	fio: string
	phone: string | undefined
	city: string
	shipping?: {
		company: string
		dep?: string
		index?: string
	}
	payment?: string
}

interface OrderDetails {
	id: number
	code: number
	name: string
	amount: number
	sum: number
	discount: number
	firmid: number
}

interface Order {
	details: string
	odetails: OrderDetails[]
}

export default function MainCheckout() {
	const { lang } = useParams<{ lang: string }>()
	const { d } = useDictionary()
	const cart = useCartContext().cart
	const removeItem = useCartContext().removeItem
	const [Cart, setCart] = useState<OrderDetails[]>([])
	const [Shipping, setShipping] = useState<string>('')
	const [DepIndex, setDepIndex] = useState<string>('')
	const [Error, setError] = useState<string>('')
	const posts: string[] = ['Нова пошта', 'Укрпошта']

	const checkoutSchema = yup.object().shape({
		fio: yup.string().trim().required(d.checkout.messages.required),
		phone: yup
			.string()
			.trim()
			.required(d.checkout.messages.required)
			.matches(/^\+38\([0-9,\),-]+$/, d.checkout.messages.required)
			.matches(/^\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/, d.checkout.messages.phone),
		city: yup.string().trim().required(d.checkout.messages.required),
		shipping: yup.string().required(d.checkout.messages.shipping),
		payment: yup.string().required(d.checkout.messages.paymant)
	})

	const {
		control,
		register,
		formState: { errors, isValid },
		getValues,
		watch
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(checkoutSchema),
		defaultValues: {
			shipping: ''
		}
	})

	const shipping = watch('shipping')

	useEffect(() => {
		setCart(getDataFromCart(cart))
	}, [cart])

	useEffect(() => {
		setShipping(shipping)
		setDepIndex('')
	}, [shipping])

	const fio = watch('fio')
	const phone = watch('phone')
	const city = watch('city')
	const payment = watch('payment')
	useEffect(() => {
		if (Error.length > 0) setError('')
		// eslint-disable-next-line
	}, [shipping, fio, phone, city, payment, DepIndex])

	const getDetails = (): Details => {
		const res: Details = {
			fio: getValues('fio'),
			phone: getValues('phone'),
			city: getValues('city'),
			shipping: getValues('shipping').length
				? {
						company: getValues('shipping'),
						dep: getValues('shipping').includes(posts[0]) ? DepIndex : undefined,
						index: getValues('shipping').includes(posts[1]) ? DepIndex : undefined
				  }
				: undefined,
			payment: getValues('payment').length ? getValues('payment') : undefined
		}
		return res
	}

	const getDataFromCart = (cart: any[]): OrderDetails[] => {
		let items: OrderDetails[] = []
		cart.forEach((item: any) => {
			items.push({
				id: item.id,
				code: item.code,
				name: item.name,
				amount: item.amount,
				sum:
					item.amount >= item.dcount
						? item.amount * item.price - (item.amount * item.price * item.dpercent) / 100
						: item.amount * item.price,
				discount: item.amount >= item.dcount ? item.dpercent : 0,
				firmid: item.firm.id
			})
		})
		return items
	}

	const clearCart = (items: OrderDetails[]) => items.forEach((item: OrderDetails) => removeItem(item.id))

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (Cart.length > 0) {
			await axiosService
				.post('order', { details: JSON.stringify(getDetails()), odetails: Cart } as Order)
				.then(({ data: Order }) => {
					// clearCart(Cart)
				})
				.catch(error => {
					setError(d.checkout.messages.error)
				})
		}
	}

	const onChangeDepIndexHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setDepIndex(e.target.value)
	}

	return (
		<div className='container-simple'>
			<div className='main-simple'>
				<div className='dialog-body'>
					<form className='dialog-form' onSubmit={onSubmitHandler}>
						<div className='checkout-frame'>
							<h2>{d.checkout.title}</h2>
							<div className='form-row'>
								<label
									htmlFor='fio'
									className='form-label'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										textOverflow: 'ellipsis',
										WebkitLineClamp: 1,
										overflow: 'hidden',
										whiteSpace: 'normal'
									}}
								>
									{d.checkout.fio}
								</label>
								<input
									{...register('fio')}
									id='fio'
									className={`checkout-input${errors.fio ? ' error-color' : ''}`}
									type='text'
									maxLength={100}
								/>
								<div className='error-row'>
									<p className='error-message'>{`${errors.fio ? errors.fio.message : ''}`}</p>
								</div>
							</div>
							<div className='form-row'>
								<label htmlFor='phone' className='form-label'>
									{d.checkout.phone}
								</label>
								<Controller
									control={control}
									name='phone'
									render={({ field: { ref, ...field } }) => (
										<IMaskInput
											{...field}
											id='phone'
											className={`checkout-input${errors.phone ? ' error-color' : ''} phone`}
											mask={Masks.phone.with_brackets}
										/>
									)}
								/>
								<div className='error-row'>
									<p className='error-message'>{`${errors.phone ? errors.phone.message : ''}`}</p>
								</div>
							</div>
							<div className='form-row'>
								<label
									htmlFor='city'
									className='form-label'
									style={{
										display: '-webkit-box',
										WebkitBoxOrient: 'vertical',
										textOverflow: 'ellipsis',
										WebkitLineClamp: 1,
										overflow: 'hidden',
										whiteSpace: 'normal'
									}}
								>
									{d.checkout.city}
								</label>
								<input
									{...register('city')}
									id='city'
									className={`checkout-input${errors.city ? ' error-color' : ''}`}
									type='text'
									maxLength={80}
								/>
								<div className='error-row'>
									<p className='error-message'>{`${errors.city ? errors.city.message : ''}`}</p>
								</div>
							</div>
							<div className='form-row'>
								<FormControl>
									<label className='form-label'>{d.checkout.shipping.title}</label>
									<Controller
										control={control}
										name='shipping'
										render={({ field }) => (
											<RadioGroup {...field}>
												<FormControlLabel
													sx={{ mt: -1, mb: -1 }}
													value={posts[0]}
													control={<Radio color='primary' />}
													label={d.checkout.shipping.new_post.title}
												/>
												<FormControlLabel
													sx={{ mt: -1, mb: -1 }}
													value={posts[1]}
													control={<Radio color='primary' />}
													label={d.checkout.shipping.ukr_post.title}
												/>
											</RadioGroup>
										)}
									/>
									{Shipping.length > 0 && (
										<input
											className='checkout-input checkout-input-dep-index'
											/*placeholder={Shipping.includes(posts[0])?translate('checkout.shipping.new_post.dep', locale):Shipping.includes(posts[1])?translate('checkout.shipping.ukr_post.index', locale):''}*/
											maxLength={Shipping.includes(posts[0]) ? 40 : Shipping.includes(posts[1]) ? 5 : 0}
											type='text'
											value={DepIndex}
											onChange={onChangeDepIndexHandler}
										/>
									)}
									<div className='error-row' />
								</FormControl>
							</div>
							<div className='form-row'>
								<FormControl>
									<label className='form-label'>{d.checkout.payment.title}</label>
									<Controller
										control={control}
										name='payment'
										render={({ field }) => (
											<RadioGroup {...field}>
												<FormControlLabel
													sx={{ mt: -1, mb: -1 }}
													value={d.checkout.payment.card}
													control={<Radio color='primary' />}
													label={d.checkout.payment.card}
												/>
												<FormControlLabel
													sx={{ mt: -1, mb: -1 }}
													value={d.checkout.payment.cash}
													control={<Radio color='primary' />}
													label={d.checkout.payment.cash}
												/>
												<FormControlLabel
													sx={{ mt: -1, mb: -1 }}
													value={d.checkout.payment.cashless}
													control={<Radio color='primary' />}
													label={d.checkout.payment.cashless}
												/>
											</RadioGroup>
										)}
									/>
								</FormControl>
							</div>
							{Cart.length > 0 && (
								<div className='checkout-grid-container'>
									{Cart.map((item: OrderDetails) => (
										<div className='checkout-grid-container-row' key={item.id}>
											<div className='checkout-grid-item checkout-grid-item-code'>{item.code}</div>
											<div className='checkout-grid-item checkout-grid-item-name'>{tt(item.name, lang)}</div>
											<div className='checkout-grid-item checkout-grid-item-amount'>{item.amount}</div>
											<div className='checkout-grid-item checkout-grid-item-sum'>
												<MoneyFormat {...{ value: item.sum, className: '', currency: true }} />
											</div>
										</div>
									))}
								</div>
							)}
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									marginTop: '20px',
									marginBottom: '-15px',
									width: '100%'
								}}
							>
								<div>
									<div style={{ width: '100%', maxWidth: '400px' }}>
										<button className='custom-button' disabled={!isValid}>
											{d.checkout.confirm_order}
										</button>
									</div>
									<div className='error-row' style={{ marginTop: '-10px' }}>
										<p className='error-message' style={{ textAlign: 'center' }}>{`${
											Error.length ? Error : ''
										}`}</p>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
