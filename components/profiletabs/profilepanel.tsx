import axios from "axios";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
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
         .oneOf(['1', '2'], translate('auth.messages.gender', locale))
   })

   const { register, handleSubmit, formState: { errors }, clearErrors, getValues, setValue, control } = useForm({
      resolver: yupResolver(validationSchema)
   });

   useEffect(() => {
      setValue('gender', gender)
      // eslint-disable-next-line
   }, [gender])

   const onSubmit = () => {
      axios.post('user/changeprofile', { name: getValues('name'), gender }, { headers: { lang: locale } }).then(() => {
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
               <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="form-row-simple">
               <label className="form-label-simple">{translate('profile.tabs.panels.gender.name', locale)}</label>
               <RadioGroup
                  aria-label='gender'
                  value={gender}
                  onChange={onChangeGenderHandler}
               >
                  <FormControlLabel value="1" control={<Radio color="primary" />} label={translate('profile.tabs.panels.gender.male', locale)} />
                  <FormControlLabel value="2" control={<Radio color="primary" />} label={translate('profile.tabs.panels.gender.famale', locale)} />
               </RadioGroup>
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{errors.gender?.message}</div>
            </div>
            <div className="form-row-simple">
               <label htmlFor="phone" className="form-label-simple">{translate('profile.tabs.panels.phone', locale)}</label>
               <InputMask disabled id="phone" className="custom-input-simple phone-bounds" value={props.phone} mask="+38 999 999 99 99" maskPlaceholder='' alwaysShowMask={true} readOnly={true} ></InputMask>
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