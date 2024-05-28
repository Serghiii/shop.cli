import React, { MouseEvent, useRef, useState, ChangeEvent, useEffect } from "react";
import InputMask from "react-input-mask";
import { useMainContext } from "../contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { translate } from '../locales/translate';
import { useRouter } from "next/router";
import Image from 'next/image';
import GoogleIcon from '../public/icon/google.svg';
import { useAppDispatch, useAppSelector, LoginAuthAction, RegisterAuthAction, GoogleAuthAction, ErrorUpdate } from "../redux";

const DialogLogin: React.FC = () => {
   const { locale } = useRouter()
   const mainCtx = useMainContext();
   const dispatch = useAppDispatch();
   const [Register, setRegister] = useState(false);
   const backdrop = useRef<HTMLDivElement>(null);
   const mouseState = {
      Down: false,
      Up: false
   }

   const backdropMouseDownHandler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).contains(backdrop.current)) {
         mouseState.Down = true;
      } else {
         mouseState.Down = false;
      }
   }

   const backdropMouseUpHandler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).contains(backdrop.current)) {
         mouseState.Up = true;
      } else {
         mouseState.Up = false;
      }
   }

   const backdropClickHandler = (e: MouseEvent) => {
      if (mouseState.Down && mouseState.Up && (e.target as HTMLElement).contains(backdrop.current)) {
         closeClickHandler();
      }
   };

   const closeClickHandler = () => {
      mainCtx.stateProfile[1](false);
      document.body.removeAttribute('class');
      mainCtx.mainSwiper.current?.removeAttribute('style');
   }

   const registerClickHandler = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(ErrorUpdate({ code: '', message: '' }))
      setRegister(!Register);
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
      dispatch(ErrorUpdate({ code: '', message: '' }))
      gapi.load('auth2', () => {
         gapi.auth2.init({
            client_id: process.env.GOOGLE_ID
         })
      })
      // eslint-disable-next-line
   }, [])

   const LoginForm = () => {
      const [rememberme, setRememberMe] = useState(false)
      const auth = useAppSelector((state: any) => state.auth)

      const loginSchema = yup.object().shape({
         login: yup.string().trim()
            .required(translate('auth.messages.required', locale))
            .min(2, translate('auth.messages.login', locale)),
         loginPassword: yup.string()
            .required(translate('auth.messages.required', locale))
            .min(6, translate('auth.messages.password', locale))
      });

      const { register, formState: { errors, isValid }, handleSubmit, getValues } = useForm({
         mode: "onChange",
         resolver: yupResolver(loginSchema)
      });

      const loginSubmitHandle = async () => {
         const resultAction = await dispatch(LoginAuthAction({
            username: getValues('login'),
            password: getValues('loginPassword'),
            rememberme
         }))
         if (LoginAuthAction.fulfilled.match(resultAction)) {
            closeClickHandler()
         }
      }

      const googleClickHandler = async () => {
         const GoogleAuth = await gapi.auth2.getAuthInstance()
         await GoogleAuth.signIn().then((data: any) => {
            dispatch(GoogleAuthAction({ token: getAccessToken(data) })).then(resultAction => {
               if (GoogleAuthAction.fulfilled.match(resultAction)) {
                  closeClickHandler()
               }
            })
         }, (message) => {
            dispatch(ErrorUpdate({ code: '', message: message.error }))
         })
      }

      const rememberMeOnChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
         setRememberMe(e.target.checked);
      }

      return (
         <>
            <div className="dialog-header">
               <h2 className="dialog-header-title">{translate('auth.login.title', locale)}</h2>
               <svg className="bt-close" onClick={closeClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                  <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
               </svg>
            </div>
            <div className="dialog-body login">
               <form className="dialog-form" onSubmit={handleSubmit(loginSubmitHandle)}>
                  <div className="form-row">
                     <label htmlFor="auth-login" className="form-label">{translate('auth.login.name', locale)}</label>
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
                        onClose={() => {
                           dispatch(ErrorUpdate({ code: '', message: '' }))
                        }}>
                        {translate('server.' + auth.error.code, locale, auth.error.message)}
                     </Alert>}
                  </div>
                  <button className="custom-button" disabled={!isValid}>{translate('auth.login.enter', locale)}</button>
               </form>
               <button className="custom-button" disabled={isValid} onClick={googleClickHandler}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Image width={18} height={18} src={GoogleIcon} alt="" />
                     <span style={{ paddingLeft: '6px' }}>{translate('auth.login.enter_google', locale)}</span>
                  </div>
               </button>
               <button className="form-register" onClick={registerClickHandler}>{translate('auth.register.title', locale)}</button>
            </div>
         </>
      )
   }

   const RegisterForm = () => {
      const auth = useAppSelector((state: any) => state.auth)

      const registerSchema = yup.object().shape({
         name: yup.string().trim()
            .required(translate('auth.messages.required', locale))
            .matches(/^[а-яА-ЯіІёЁ\s]+$/, translate('auth.messages.login_cyr', locale)),
         phone: yup.string()
            .matches(/^\+38\s[0-9,\s]+$/, translate('auth.messages.required', locale))
            .matches(/^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, translate('auth.messages.phone', locale)),
         email: yup.string()
            .required(translate('auth.messages.required', locale))
            .email(translate('auth.messages.email', locale)),
         password: yup.string()
            .required(translate('auth.messages.required', locale))
            .min(6, translate('auth.messages.password', locale))
      });

      const { register, formState: { errors, isValid }, handleSubmit, getValues } = useForm({
         mode: "onChange",
         resolver: yupResolver(registerSchema)
      });

      const registerSubmitHandle = async () => {
         const resultAction = await dispatch(RegisterAuthAction({
            name: getValues('name'),
            // phone: getValues('phone').replace(/\s/g, ''),
            phone: "getValues('phone').replace(/\s/g, '')",
            email: getValues('email'),
            password: getValues('password'),
            activation_on: translate('server.mail.activation_on', locale),
            activation_ref: translate('server.mail.activation_ref', locale)
         }))
         if (RegisterAuthAction.fulfilled.match(resultAction)) {
            closeClickHandler()
         }
      }

      return (
         <>
            <div className="dialog-header">
               <h2 className="dialog-header-title">{translate('auth.register.title', locale)}</h2>
               <svg className="bt-close" onClick={closeClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                  <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
               </svg>
            </div>
            <div className="dialog-body login">
               <form className="dialog-form" onSubmit={handleSubmit(registerSubmitHandle)}>
                  <div className="form-row">
                     <label htmlFor="name" className="form-label">{translate('auth.register.name', locale)}</label>
                     <input
                        {...register("name")}
                        id="name"
                        className={`custom-input${errors.name ? ' error-color' : ''}`}
                        type="text"
                        maxLength={50}
                     />
                     <div className="error-row">
                        <p className="error-message">{`${errors.name ? errors.name.message : ''}`}</p>
                     </div>
                  </div>
                  <div className="form-row">
                     <label htmlFor="phone" className="form-label">{translate('auth.register.phone', locale)}</label>
                     <InputMask
                        {...register("phone")}
                        id="phone"
                        className={`custom-input${errors.phone ? ' error-color' : ''}`}
                        mask="+38 999 999 99 99"
                        maskPlaceholder=''
                        alwaysShowMask={true}
                     />
                     <div className="error-row">
                        <p className="error-message">{`${errors.phone ? errors.phone.message : ''}`}</p>
                     </div>
                  </div>
                  <div className="form-row">
                     <label htmlFor="email" className="form-label">{translate('auth.register.email', locale)}</label>
                     <input
                        {...register("email")}
                        id="email"
                        className={`custom-input${errors.email ? ' error-color' : ''}`}
                        type="email"
                        maxLength={50}
                     />
                     <div className="error-row">
                        <p className="error-message">{`${errors.email ? errors.email.message : ''}`}</p>
                     </div>
                  </div>
                  <div className="form-row">
                     <label htmlFor="password" className="form-label">{translate('auth.register.password', locale)}</label>
                     <input
                        {...register("password")}
                        id="password"
                        className={`custom-input${errors.password ? ' error-color' : ''}`}
                        type="password"
                        maxLength={500}
                     />
                     <div className="error-row">
                        <p className="error-message">{`${errors.password ? errors.password.message : ''}`}</p>
                     </div>
                  </div>
                  <div className="form-row">
                     {auth.error?.message && <Alert
                        severity="error"
                        onClose={() => {
                           dispatch(ErrorUpdate({ code: '', message: '' }))
                        }}>
                        {translate('server.' + auth.error.code, locale, auth.error.message)}
                     </Alert>}
                  </div>
                  <button className="custom-button" disabled={!isValid} >{translate('auth.register.register', locale)}</button>
               </form>
               <button className="form-register" onClick={registerClickHandler}>{translate('auth.login.title', locale)}</button>
            </div>
         </>
      )
   }

   return (
      <>
         <div ref={backdrop} className={`dialog-wrapper dialog-backdrop${mainCtx.stateProfile[0] ? " show" : ""}`} onClick={backdropClickHandler} onMouseDown={backdropMouseDownHandler} onMouseUp={backdropMouseUpHandler}>
            <div className="dialog">
               {Register ? <RegisterForm /> : <LoginForm />}
            </div>
         </div >
      </>
   )
}

export default DialogLogin