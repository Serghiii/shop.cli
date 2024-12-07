import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IMaskInput } from 'react-imask';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { translate } from '../../locales/translate';
import { useRouter } from "next/router";
import { Masks } from "../../src/common";

const ProfilePanel: React.FC<any> = (props) => {
   const { locale } = useRouter()

   const validationSchema = yup.object().shape({
      name: yup.string()
         .required(translate('auth.messages.required', locale))
         .min(2, translate('auth.messages.login', locale))
         .matches(/^[а-яА-ЯіІёЁ\s]+$/, translate('auth.messages.login_cyr', locale)),
      gender: yup.string()
         .required(translate('auth.messages.gender', locale))
         .oneOf(['1', '2'], translate('auth.messages.gender', locale)),
      phone: yup.string()
         .matches(/^\+38\s[0-9,\s]+$/, translate('auth.messages.required', locale))
         .matches(/^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, translate('auth.messages.phone', locale)),
   })

   const { control, register, handleSubmit, formState: { errors }, clearErrors, getValues, setValue } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
         gender: props.gender,
         phone: props.phone
      }
   });

   const onSubmitHandler = () => {
      let values = { name: getValues('name'), gender: getValues('gender') }
      const phone: any = getValues('phone')?.replace(/\s/g, '')
      axios.post('user/changeprofile', props.phone !== phone ? { ...values, phone: phone } : values).then(() => {
         window.location.reload()
      })
   }

   return (
      <>
         <form className="dialog-form-simple" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form-row-simple">
               <label htmlFor="name" className="form-label-simple">{translate('profile.tabs.panels.pib', locale)}</label>
               <input {...register("name")} id="name" className="custom-input-simple" defaultValue={props.name} type="text" maxLength={50} name="name" />
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{`${errors.name ? errors.name.message : ''}`}</div>
            </div>
            <div className="form-row-simple">
               <label className="form-label-simple">{translate('profile.tabs.panels.gender.name', locale)}</label>
               <Controller
                  control={control}
                  name='gender'
                  render={({field}) => (
                     <RadioGroup
                        {...field}
                        aria-label='gender'
                        >
                        <FormControlLabel value="1" disabled={props.gender in ['1', '2']} control={<Radio color="primary" />} label={translate('profile.tabs.panels.gender.male', locale)} />
                        <FormControlLabel value="2" disabled={props.gender in ['1', '2']} control={<Radio color="primary" />} label={translate('profile.tabs.panels.gender.famale', locale)} />
                     </RadioGroup>
                  )}
               />
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{`${errors.gender ? errors.gender.message : ''}`}</div>
            </div>
            <div className="form-row-simple">
               <label htmlFor="phone" className="form-label-simple">{translate('profile.tabs.panels.phone', locale)}</label>
                  <Controller
                     control={control}
                     name='phone'
                     disabled={props.phone?.length > 0}
                     render={({field: { ref, ...field }}) => (
                        <IMaskInput
                           {...field}
                           id={field.name}
                           className="custom-input-simple phone-bounds"
                           mask={Masks.phone[0]}
                        />
                     )}
                  />
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{`${errors.phone ? errors.phone.message : ''}`}</div>
            </div>
            <div className="form-row-simple">
               <label htmlFor="email" className="form-label-simple">{translate('profile.tabs.panels.email', locale)}</label>
               <input disabled id="email" className="custom-input-simple" value={props.email} type="text" maxLength={50} readOnly={true} />
            </div>
            <div className="form-row-simple">
               <div className="form-label-simple btn"></div>
               <div className="custom-button-simple-wrapper">
                  <button className="custom-button-simple">{translate('profile.tabs.panels.save', locale)}</button>
               </div>
            </div>
         </form>
      </>
   )

}
export default ProfilePanel