import axios from "axios";
import InputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const ProfilePanel: React.FC<any> = (props) => {
   const [gender, setGender] = useState(props.gender)

   const validationSchema = yup.object().shape({
      name: yup.string()
         .required("Поле має бути заповнено")
         .min(2, "Ім'я не може бути менше 2 символів")
         .matches(/^[а-яА-ЯіІёЁ\s]+$/, "Введіть своє ім'я кирилицею"),
      gender: yup.string()
         .required("Вкажіть свою стать")
         .oneOf(['1', '2'], "Вкажіть свою стать")
   })

   const { register, handleSubmit, formState: { errors }, clearErrors, getValues, setValue, control } = useForm({
      resolver: yupResolver(validationSchema)
   });

   useEffect(() => {
      setValue('gender', gender)
      // eslint-disable-next-line
   }, [gender])

   const onSubmit = () => {
      axios.post('user/changeprofile', { name: getValues('name'), gender }).then(() => {
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
               <label htmlFor="name" className="form-label-simple">П.І.Б.</label>
               <input {...register("name")} id="name" className="custom-input-simple" defaultValue={props.name} type="text" maxLength={50} name="name" />
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="form-row-simple">
               <label className="form-label-simple">Стать</label>
               <RadioGroup
                  aria-label='gender'
                  value={gender}
                  onChange={onChangeGenderHandler}
               >
                  <FormControlLabel value="1" control={<Radio color="primary" />} label="Чоловіча" />
                  <FormControlLabel value="2" control={<Radio color="primary" />} label="Жіноча" />
               </RadioGroup>
            </div>
            <div className="form-row-simple" style={{ height: "11px", margin: "-14px 0 0 0" }}>
               <div className="form-label-simple hidden-div"></div>
               <div className="invalid-feedback">{errors.gender?.message}</div>
            </div>
            <div className="form-row-simple">
               <label htmlFor="phone" className="form-label-simple">Номер телефону</label>
               <InputMask disabled id="phone" className="custom-input-simple phone-bounds" value={props.phone} mask="+38 999 999 99 99" maskPlaceholder='' alwaysShowMask={true} readOnly={true} ></InputMask>
            </div>
            <div className="form-row-simple">
               <label htmlFor="email" className="form-label-simple">Ел. пошта</label>
               <input disabled id="email" className="custom-input-simple" value={props.email} type="text" maxLength={50} readOnly={true} />
            </div>
            <div className="form-row-simple">
               <div className="form-label-simple btn"></div>
               <div className="custom-button-simple-wrapper">
                  <button className="custom-button-simple">Зберегти</button>
               </div>
            </div>
         </form>
      </>
   )

}
export default ProfilePanel