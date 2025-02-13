'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import User from '../../public/icon/profile/user-login.svg'
import { useAuthContext, useDictionary } from '../contexts'
import { ErrorStatus } from '../lib/types'

const MainLogin: React.FC = () => {
	const [error, setError] = useState<ErrorStatus | null>(null)
	const { d, t } = useDictionary()
	const { session, login } = useAuthContext()
	const router = useRouter()

	const loginSchema = yup.object().shape({
		login: yup.string().trim().required(d.auth.messages.required).min(2, d.auth.messages.login),
		loginPassword: yup.string().required(d.auth.messages.required).min(6, d.auth.messages.password)
	})

	const {
		register,
		formState: { errors, isValid },
		getValues
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(loginSchema)
	})

	useEffect(() => {
		if (session.isLoggedIn) router.push('/profile')
	}, [session.isLoggedIn, router])

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault()
		const res = await login({ username: getValues('login'), password: getValues('loginPassword') })
		if (res.message !== 'Success') {
			setError(res)
		}
	}

	return (
		<div className='form-login'>
			<div className='avatar-login'>
				<Image src={User} alt='' width={80} />
			</div>
			<h2>{d.auth.login.title}</h2>
			<form className='dialog-form' onSubmit={onSubmitHandler}>
				<div className='form-row'>
					<label
						htmlFor='auth-login'
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
				<div className='form-row'>
					{error?.message && (
						<Alert
							severity='error'
							onClose={() => {
								setError(null)
							}}
						>
							{t('server.' + error.messageId) ? t('server.' + error.messageId) : error.message}
						</Alert>
					)}
				</div>
				<button className='custom-button' disabled={!isValid}>
					{d.auth.login.enter}
				</button>
			</form>
		</div>
	)
}

export default MainLogin
