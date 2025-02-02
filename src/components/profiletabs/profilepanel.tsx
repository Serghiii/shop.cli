'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import * as yup from 'yup'
import { useAuthContext, useDictionary } from '../../contexts'
import { Masks } from '../../lib/masks'

enum EnumGender {
	male = '0',
	female = '1'
}

const ProfilePanel: React.FC<any> = props => {
	const { d } = useDictionary()
	const ctxAuth = useAuthContext()

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.required(d.auth.messages.required)
			.min(2, d.auth.messages.login)
			.matches(/^[а-яА-ЯіІёЁ\s]+$/, d.auth.messages.login_cyr),
		gender: yup
			.mixed<EnumGender>()
			.oneOf(
				Object.values(EnumGender).map(e => e as EnumGender),
				d.auth.messages.gender
			)
			.required(),
		phone: yup
			.string()
			.matches(/^\+38\s[0-9,\s]+$/, d.auth.messages.required)
			.matches(/^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, d.auth.messages.phone)
	})

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			gender: props.gender,
			phone: props.phone
		}
	})

	const onSubmitHandler = () => {
		let values = { name: getValues('name'), gender: getValues('gender') }
		const phone: any = getValues('phone')?.replace(/\s/g, '')
		ctxAuth.put('user/changeprofile', props.phone !== phone ? { ...values, phone: phone } : values).then(() => {
			window.location.reload()
		})
	}

	return (
		<>
			<form className='dialog-form-simple' onSubmit={handleSubmit(onSubmitHandler)}>
				<div className='form-row-simple'>
					<label htmlFor='name' className='form-label-simple'>
						{d.profile.tabs.panels.pib}
					</label>
					<input
						{...register('name')}
						id='name'
						className='custom-input-simple'
						defaultValue={props.name}
						type='text'
						maxLength={50}
						name='name'
					/>
				</div>
				<div className='form-row-simple' style={{ height: '11px', margin: '-14px 0 0 0' }}>
					<div className='form-label-simple hidden-div'></div>
					<div className='invalid-feedback'>{`${errors.name ? errors.name.message : ''}`}</div>
				</div>
				<div className='form-row-simple'>
					<label className='form-label-simple'>{d.profile.tabs.panels.gender.name}</label>
					<Controller
						control={control}
						name='gender'
						render={({ field }) => (
							<RadioGroup {...field} aria-label='gender'>
								<FormControlLabel
									value={EnumGender.male}
									disabled={props.gender in [EnumGender.male, EnumGender.female]}
									control={<Radio color='primary' />}
									label={d.profile.tabs.panels.gender.male}
								/>
								<FormControlLabel
									value={EnumGender.female}
									disabled={props.gender in [EnumGender.male, EnumGender.female]}
									control={<Radio color='primary' />}
									label={d.profile.tabs.panels.gender.famale}
								/>
							</RadioGroup>
						)}
					/>
				</div>
				<div className='form-row-simple' style={{ height: '11px', margin: '-14px 0 0 0' }}>
					<div className='form-label-simple hidden-div'></div>
					<div className='invalid-feedback'>{`${errors.gender ? errors.gender.message : ''}`}</div>
				</div>
				<div className='form-row-simple'>
					<label htmlFor='phone' className='form-label-simple'>
						{d.profile.tabs.panels.phone}
					</label>
					<Controller
						control={control}
						name='phone'
						disabled={props.phone?.length > 0}
						render={({ field: { ref, onChange, ...field } }) => (
							<IMaskInput
								{...field}
								id='phone'
								className='custom-input-simple phone-bounds'
								mask={Masks.phone.without_brackets}
								onAccept={value => onChange({ target: { name: field.name, value: value as string } })}
							/>
						)}
					/>
				</div>
				<div className='form-row-simple' style={{ height: '11px', margin: '-14px 0 0 0' }}>
					<div className='form-label-simple hidden-div'></div>
					<div className='invalid-feedback'>{`${errors.phone ? errors.phone.message : ''}`}</div>
				</div>
				<div className='form-row-simple'>
					<label htmlFor='email' className='form-label-simple'>
						{d.profile.tabs.panels.email}
					</label>
					<input
						disabled
						id='email'
						className='custom-input-simple'
						value={props.email}
						type='text'
						maxLength={50}
						readOnly={true}
					/>
				</div>
				<div className='form-row-simple'>
					<div className='form-label-simple btn'></div>
					<div className='custom-button-simple-wrapper'>
						<button className='custom-button-simple'>{d.profile.tabs.panels.save}</button>
					</div>
				</div>
			</form>
		</>
	)
}
export default ProfilePanel
