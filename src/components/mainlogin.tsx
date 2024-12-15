'use client'
import React, { ChangeEvent, FormEvent, useState } from "react"
import Image from 'next/image';
import User from '../../public/icon/profile/user-login.svg';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { translate } from '../locales/translate';
// import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, LoginAuthAction, ErrorUpdate } from "../redux";

const MainLogin: React.FC = () => {
   // const { locale } = useRouter()
   const locale = 'uk'
   const dispatch = useAppDispatch();
   const auth = useAppSelector((state: any) => state.auth);
   const [rememberme, setRememberMe] = useState(false);

   const loginSchema = yup.object().shape({
      login: yup.string().trim()
         .required(translate('auth.messages.required', locale))
         .min(2, translate('auth.messages.login', locale)),
      loginPassword: yup.string()
         .required(translate('auth.messages.required', locale))
         .min(6, translate('auth.messages.password', locale))
   });

   const { register, formState: { errors, isValid }, getValues } = useForm({
      mode: "onChange",
      resolver: yupResolver(loginSchema)
   });

   const rememberMeOnChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked);
   }

   const onSubmitHandler = (e: FormEvent) => {
      e.preventDefault();
      dispatch(LoginAuthAction({
         username: getValues('login'),
         password: getValues('loginPassword'),
         rememberme
      }));
   }

   return (
      <div className="form-login">
         <div className="avatar-login">
            <Image src={User} alt="" width={80} />
         </div>
         <h2>{translate('auth.login.title', locale)}</h2>
         <form className="dialog-form" onSubmit={onSubmitHandler}>
            <div className="form-row">
               <label htmlFor="auth-login" className="form-label" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', WebkitLineClamp: 1, overflow: 'hidden', whiteSpace: 'normal' }}>{translate('auth.login.name', locale)}</label>
               <input
                  {...register("login")}
                  id="auth-login"
                  className={`custom-input${errors.login ? ' error-color' : ''}`}
                  type="text"
                  maxLength={50}
               />
               <div className="error-row">
                  <p className="error-message">{`${errors.login ? errors.login.message : ''}`}</p>
               </div>
            </div>
            <div className="form-row">
               <label htmlFor="auth-pass" className="form-label">{translate('auth.login.password', locale)}</label>
               <input
                  {...register("loginPassword")}
                  id="auth-pass"
                  className={`custom-input${errors.loginPassword ? ' error-color' : ''}`}
                  type="password"
                  maxLength={500}
               />
               <div className="error-row">
                  <p className="error-message">{`${errors.loginPassword ? errors.loginPassword.message : ''}`}</p>
               </div>
            </div>
            <FormGroup row>
               <FormControlLabel
                  control={<Checkbox
                     name="rememberme"
                     size="small"
                     style={{
                        color: "#3e5288",
                     }}
                     checked={rememberme}
                     onChange={rememberMeOnChangeHandle}
                  />}
                  label={translate('auth.login.rememberme', locale)}
               />
            </FormGroup>
            <div className="form-row">
               {auth.error?.message && <Alert
                  severity="error"
                  onClose={() => { dispatch(ErrorUpdate({ code: '', message: '' })) }}>
                  {translate('server.' + auth.error.code, locale, auth.error.message)}
               </Alert>}
            </div>
            <button className="custom-button" disabled={!isValid}>{translate('auth.login.enter', locale)}</button>
         </form>
      </div >
   )
}
export default MainLogin