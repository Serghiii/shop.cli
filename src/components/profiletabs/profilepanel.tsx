import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IMaskInput } from 'react-imask'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Masks } from '../../lib/masks'
import { useDictionary } from '../../contexts'

const ProfilePanel: React.FC<any> = props => {
	const { d } = useDictionary()

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.required(d.auth.messages.required)
			.min(2, d.auth.messages.login)
			.matches(/^[а-яА-ЯіІёЁ\s]+$/, d.auth.messages.login_cyr),
		gender: yup.string().required(d.auth.messages.gender).oneOf(['1', '2'], d.auth.messages.gender),
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
		clearErrors,
		getValues,
		setValue
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
		axios.post('user/changeprofile', props.phone !== phone ? { ...values, phone: phone } : values).then(() => {
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
									value='1'
									disabled={props.gender in ['1', '2']}
									control={<Radio color='primary' />}
									label={d.profile.tabs.panels.gender.male}
								/>
								<FormControlLabel
									value='2'
									disabled={props.gender in ['1', '2']}
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
						render={({ field: { ref, ...field } }) => (
							<IMaskInput
								{...field}
								id={field.name}
								className='custom-input-simple phone-bounds'
								mask={Masks.phone.without_brackets}
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
