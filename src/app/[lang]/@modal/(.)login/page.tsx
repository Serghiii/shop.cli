'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Image from 'next/image'
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import * as yup from 'yup'
import GoogleIcon from '../../../../../public/icon/google.svg'
import { useDictionary, useMainContext } from '../../../../contexts'
import { Masks } from '../../../../lib/masks'
import {
	ErrorUpdate,
	GoogleAuthAction,
	LoginAuthAction,
	RegisterAuthAction,
	useAppDispatch,
	useAppSelector
} from '../../../../redux'
import { useRouter } from 'next/navigation'

const ModalLogin: React.FC = () => {
	const { d, t } = useDictionary()
	const mainCtx = useMainContext()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [Register, setRegister] = useState(false)
	const backdrop = useRef<HTMLDivElement>(null)
	const mouseState = {
		Down: false,
		Up: false
	}

	const backdropMouseDownHandler = (e: MouseEvent) => {
		if ((e.target as HTMLElement).contains(backdrop.current)) {
			mouseState.Down = true
		} else {
			mouseState.Down = false
		}
	}

	const backdropMouseUpHandler = (e: MouseEvent) => {
		if ((e.target as HTMLElement).contains(backdrop.current)) {
			mouseState.Up = true
		} else {
			mouseState.Up = false
		}
	}

	const backdropClickHandler = (e: MouseEvent) => {
		if (mouseState.Down && mouseState.Up && (e.target as HTMLElement).contains(backdrop.current)) {
			closeClickHandler()
		}
	}

	const closeClickHandler = () => {
		router.back()
		document.body.removeAttribute('class')
		mainCtx.mainSwiper.current?.removeAttribute('style')
	}

	const registerClickHandler = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(ErrorUpdate({ code: '', message: '' }))
		setRegister(!Register)
	}

	const getAccessToken = (data: any) => {
		let res = ''
		for (let el of Object.keys(data)) {
			res = data[el]['access_token']
			if (res !== undefined) break
		}
		return res
	}

	useEffect(() => {
		let padding = '0'
		if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
			padding = String(window.innerWidth - document.documentElement.clientWidth) + 'px'
		}
		document.body.classList.add('_lock')
		if (mainCtx.mainSwiper.current) mainCtx.mainSwiper.current.style.paddingRight = padding

		dispatch(ErrorUpdate({ code: '', message: '' }))

		try {
			gapi.load('auth2', () => {
				gapi.auth2.init({
					client_id: process.env.GOOGLE_ID
				})
			})
		} catch (e) {}
	}, [, mainCtx.mainSwiper, dispatch])

	const LoginForm = () => {
		const [rememberme, setRememberMe] = useState(false)
		const auth = useAppSelector((state: any) => state.auth)

		const loginSchema = yup.object().shape({
			login: yup.string().trim().required(d.auth.messages.required).min(2, d.auth.messages.login),
			loginPassword: yup.string().required(d.auth.messages.required).min(6, d.auth.messages.password)
		})

		const {
			register,
			formState: { errors, isValid },
			handleSubmit,
			getValues
		} = useForm({
			mode: 'onChange',
			resolver: yupResolver(loginSchema)
		})

		const loginSubmitHandle = async () => {
			const resultAction = await dispatch(
				LoginAuthAction({
					username: getValues('login'),
					password: getValues('loginPassword'),
					rememberme
				})
			)
			if (LoginAuthAction.fulfilled.match(resultAction)) {
				closeClickHandler()
			}
		}

		const googleClickHandler = async () => {
			const GoogleAuth = await gapi.auth2.getAuthInstance()
			await GoogleAuth.signIn().then(
				(data: any) => {
					dispatch(GoogleAuthAction({ token: getAccessToken(data) })).then(resultAction => {
						if (GoogleAuthAction.fulfilled.match(resultAction)) {
							closeClickHandler()
						}
					})
				},
				message => {
					dispatch(ErrorUpdate({ code: '', message: message.error }))
				}
			)
		}

		const rememberMeOnChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
			setRememberMe(e.target.checked)
		}

		return (
			<>
				<div className='dialog-header'>
					<h2 className='dialog-header-title'>{d.auth.login.title}</h2>
					<svg
						className='bt-close'
						onClick={closeClickHandler}
						viewBox='0 0 413.348 413.348'
						height='15px'
						width='15px'
					>
						<path d='m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z' />
					</svg>
				</div>
				<div className='dialog-body login'>
					<form className='dialog-form' onSubmit={handleSubmit(loginSubmitHandle)}>
						<div className='form-row'>
							<label htmlFor='auth-login' className='form-label'>
								{d.auth.login.name}
							</label>
							<input
								{...register('login')}
								id='auth-login'
								className={`custom-input${errors.login ? ' error-color' : ''}`}
								type='text'
								maxLength={50}
							/>
							<div className='error-row'>
								<p className='error-message'>{`${errors.login ? errors.login.message : ''}`}</p>
							</div>
						</div>
						<div className='form-row'>
							<label htmlFor='auth-pass' className='form-label'>
								{d.auth.login.password}
							</label>
							<input
								{...register('loginPassword')}
								id='auth-pass'
								className={`custom-input${errors.loginPassword ? ' error-color' : ''}`}
								type='password'
								maxLength={500}
							/>
							<div className='error-row'>
								<p className='error-message'>{`${errors.loginPassword ? errors.loginPassword.message : ''}`}</p>
							</div>
						</div>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										name='rememberme'
										size='small'
										style={{
											color: '#3e5288'
										}}
										checked={rememberme}
										onChange={rememberMeOnChangeHandle}
									/>
								}
								label={d.auth.login.rememberme}
							/>
						</FormGroup>
						<div className='form-row'>
							{auth.error?.message && (
								<Alert
									severity='error'
									onClose={() => {
										dispatch(ErrorUpdate({ code: '', message: '' }))
									}}
								>
									{t('server.' + auth.error.code) ? t('server.' + auth.error.code) : auth.error.message}
								</Alert>
							)}
						</div>
						<button className='custom-button' disabled={!isValid}>
							{d.auth.login.enter}
						</button>
					</form>
					<button className='custom-button' disabled={isValid} onClick={googleClickHandler}>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<Image width={18} height={18} src={GoogleIcon} alt='' />
							<span style={{ paddingLeft: '6px' }}>{d.auth.login.enter_google}</span>
						</div>
					</button>
					<button className='form-register' onClick={registerClickHandler}>
						{d.auth.register.title}
					</button>
				</div>
			</>
		)
	}

	const RegisterForm = () => {
		const auth = useAppSelector((state: any) => state.auth)

		const registerSchema = yup.object().shape({
			name: yup
				.string()
				.trim()
				.required(d.auth.messages.required)
				.matches(/^[а-яА-ЯіІёЁ\s]+$/, d.auth.messages.login_cyr),
			phone: yup
				.string()
				.matches(/^\+38\s[0-9,\s]+$/, d.auth.messages.required)
				.matches(/^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, d.auth.messages.phone),
			email: yup.string().required(d.auth.messages.required).email(d.auth.messages.email),
			password: yup.string().required(d.auth.messages.required).min(6, d.auth.messages.password)
		})

		const {
			control,
			register,
			formState: { errors, isValid },
			handleSubmit,
			getValues
		} = useForm({
			mode: 'onChange',
			resolver: yupResolver(registerSchema)
		})

		const registerSubmitHandle = async () => {
			const resultAction = await dispatch(
				RegisterAuthAction({
					name: getValues('name'),
					// phone: getValues('phone').replace(/\s/g, ''),
					phone: "getValues('phone').replace(/s/g, '')",
					email: getValues('email'),
					password: getValues('password'),
					activation_on: d.server.mail.activation_on,
					activation_ref: d.server.mail.activation_ref
				})
			)
			if (RegisterAuthAction.fulfilled.match(resultAction)) {
				closeClickHandler()
			}
		}

		return (
			<>
				<div className='dialog-header'>
					<h2 className='dialog-header-title'>{d.auth.register.title}</h2>
					<svg
						className='bt-close'
						onClick={closeClickHandler}
						viewBox='0 0 413.348 413.348'
						height='15px'
						width='15px'
					>
						<path d='m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z' />
					</svg>
				</div>
				<div className='dialog-body login'>
					<form className='dialog-form' onSubmit={handleSubmit(registerSubmitHandle)}>
						<div className='form-row'>
							<label htmlFor='name' className='form-label'>
								{d.auth.register.name}
							</label>
							<input
								{...register('name')}
								id='name'
								className={`custom-input${errors.name ? ' error-color' : ''}`}
								type='text'
								maxLength={50}
							/>
							<div className='error-row'>
								<p className='error-message'>{`${errors.name ? errors.name.message : ''}`}</p>
							</div>
						</div>
						<div className='form-row'>
							<label htmlFor='phone' className='form-label'>
								{d.auth.register.phone}
							</label>
							<Controller
								control={control}
								name='phone'
								render={({ field: { ref, ...field } }) => (
									<IMaskInput
										{...field}
										id='phone'
										className={`checkout-input${errors.phone ? ' error-color' : ''}`}
										mask={Masks.phone.without_brackets}
									/>
								)}
							/>
							<div className='error-row'>
								<p className='error-message'>{`${errors.phone ? errors.phone.message : ''}`}</p>
							</div>
						</div>
						<div className='form-row'>
							<label htmlFor='email' className='form-label'>
								{d.auth.register.email}
							</label>
							<input
								{...register('email')}
								id='email'
								className={`custom-input${errors.email ? ' error-color' : ''}`}
								type='email'
								maxLength={50}
							/>
							<div className='error-row'>
								<p className='error-message'>{`${errors.email ? errors.email.message : ''}`}</p>
							</div>
						</div>
						<div className='form-row'>
							<label htmlFor='password' className='form-label'>
								{d.auth.register.password}
							</label>
							<input
								{...register('password')}
								id='password'
								className={`custom-input${errors.password ? ' error-color' : ''}`}
								type='password'
								maxLength={500}
							/>
							<div className='error-row'>
								<p className='error-message'>{`${errors.password ? errors.password.message : ''}`}</p>
							</div>
						</div>
						<div className='form-row'>
							{auth.error?.message && (
								<Alert
									severity='error'
									onClose={() => {
										dispatch(ErrorUpdate({ code: '', message: '' }))
									}}
								>
									{t('server.' + auth.error.code) ? t('server.' + auth.error.code) : auth.error.message}
								</Alert>
							)}
						</div>
						<button className='custom-button' disabled={!isValid}>
							{d.auth.register.register}
						</button>
					</form>
					<button className='form-register' onClick={registerClickHandler}>
						{d.auth.login.title}
					</button>
				</div>
			</>
		)
	}

	return (
		<>
			<div
				ref={backdrop}
				className='dialog-wrapper dialog-backdrop show'
				onClick={backdropClickHandler}
				onMouseDown={backdropMouseDownHandler}
				onMouseUp={backdropMouseUpHandler}
			>
				<div className='dialog'>{Register ? <RegisterForm /> : <LoginForm />}</div>
			</div>
		</>
	)
}

export default ModalLogin