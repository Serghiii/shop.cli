import axios from "axios";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { translate } from '../../locales/translate';
import { useRouter } from "next/router";

const ProfilePanel: React.FC<any> = (props) => {
   const [gender, setGender] = useState(props.gender)
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

   const { register, handleSubmit, formState: { errors }, clearErrors, getValues, setValue } = useForm({
      resolver: yupResolver(validationSchema)
   });

   useEffect(() => {
      setValue('gender', gender)
      // eslint-disable-next-line
   }, [gender])

   const onSubmit = () => {
      let values = { name: getValues('name'), gender }
      const phone: any = getValues('phone')?.replace(/\s/g, '')
      axios.post('user/changeprofile', props.phone !== phone ? { ...values, phone: phone } : values).then(() => {
         window.location.reload()
      })
   }

   const onChangeGenderHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setGender(e.target.value)
      clearErrors('gender')
   }

   return (
      <>
         <form className="dialog-form-simple" onSubmit={handleSubmit(onSubmit)}>
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
               <RadioGroup
                  aria-label='gender'
                  value={gender}
                  onChange={onChangeGenderHandler}
               >
                  <FormControlLabel value="1" disabled={props.gender in ['1', '2']} control={<Radio color="primary" />} label={translate('profile.tabs.panels.gender.male', locale)} />
                  <FormControlLabel value="2" disabled={props.gender in ['1', '2']} control={<Radio color="primary" />} label={translate('profile.tabs.panels.gender.famale', locale)} />
               </RadioGroup>
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{`${errors.gender ? errors.gender.message : ''}`}</div>
            </div>
            <div className="form-row-simple">
               <label htmlFor="phone" className="form-label-simple">{translate('profile.tabs.panels.phone', locale)}</label>
               <InputMask {...register("phone")}
                  id="phone"
                  disabled={props.phone?.length > 0}
                  className="custom-input-simple phone-bounds"
                  defaultValue={props.phone}
                  name="phone"
                  mask="+38 999 999 99 99"
                  maskPlaceholder=''
                  alwaysShowMask={true}
                  readOnly={props.phone?.length > 0}>
               </InputMask>
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