'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuthContext, useDictionary } from '../../../contexts'

const PasswordPanel: React.FC = () => {
	const { d } = useDictionary()
	const { patch } = useAuthContext()

	const validationSchema = yup.object().shape({
		password: yup.string().required(d.auth.messages.required).min(6, d.auth.messages.password),
		cpassword: yup
			.string()
			.required(d.auth.messages.required)
			.min(6, d.auth.messages.password)
			.oneOf([yup.ref('password')], d.auth.messages.password_eq)
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm({
		resolver: yupResolver(validationSchema)
	})

	const onSubmitHandle = () => {
		patch('user/changepassword', { password: getValues('password') }).then(() => {
			window.location.reload()
		})
	}

	return (
		<form className='dialog-form-simple' onSubmit={handleSubmit(onSubmitHandle)}>
			<div className='form-row-simple'>
				<label htmlFor='Password' className='form-label-simple'>
					{d.profile.tabs.panels.newpassword}
				</label>
				<input
					{...register('password')}
					id='Password'
					className='custom-input-simple'
					name='password'
					type='password'
					maxLength={500}
				/>
			</div>
			<div className='form-row-simple' style={{ height: '11px', margin: '-14px 0 0 0' }}>
				<div className='form-label-simple hidden-div'></div>
				<div className='invalid-feedback'>{`${errors.password ? errors.password.message : ''}`}</div>
			</div>
			<div className='form-row-simple'>
				<label htmlFor='confirmPassword' className='form-label-simple'>
					{d.profile.tabs.panels.reppassword}
				</label>
				<input
					{...register('cpassword')}
					id='confirmPassword'
					className='custom-input-simple'
					name='cpassword'
					type='password'
					maxLength={500}
				/>
			</div>
			<div className='form-row-simple' style={{ height: '11px', margin: '-14px 0 0 0' }}>
				<div className='form-label-simple hidden-div'></div>
				<div className='invalid-feedback'>{`${errors.password ? errors.password.message : ''}`}</div>
			</div>
			<div className='form-row-simple'>
				<div className='form-label-simple'></div>
				<div style={{ display: 'inlineBlock' }}>
					<button className='custom-button-simple' disabled={false}>
						{d.profile.tabs.panels.save}
					</button>
				</div>
			</div>
		</form>
	)
}
export default PasswordPanel
