import React, { MouseEvent, useRef, useState, ChangeEvent } from "react";
import InputMask from "react-input-mask";
import { LoginAuthAction, RegisterAuthAction, useAuthContext, useMainContext } from "../contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { translate } from '../locales/translate';
import { useRouter } from "next/router";

const DialogLogin: React.FC = () => {
   const { locale } = useRouter()
   const mainCtx = useMainContext();
   const dispatch = useAuthContext().authState[1];
   const [Register, setRegister] = useState(false);
   const [rememberme, setRememberMe] = useState(false);
   const backdrop = useRef<HTMLDivElement>(null);
   const mouseState = {
      Down: false,
      Up: false
   }

   const loginSchema = yup.object().shape({
      login: yup.string().trim()
         .required(translate('auth.messages.required', locale))
         .min(2, translate('auth.messages.login', locale)),
      loginPassword: yup.string()
         .required(translate('auth.messages.required', locale))
         .min(6, translate('auth.messages.password', locale))
   });

   const ufLogin = useForm({
      mode: "onChange",
      resolver: yupResolver(loginSchema)
   });

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

   const ufRegister = useForm({
      mode: "onChange",
      resolver: yupResolver(registerSchema)
   });

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

   const setLoginError = (message: string) => {
      ufLogin.setError("server", { type: "server", message });
   }

   const loginSubmitHandle = () => {
      LoginAuthAction(dispatch, {
         username: ufLogin.getValues('login'),
         password: ufLogin.getValues('loginPassword'),
         rememberme
      }, locale, setLoginError, closeClickHandler);
   }

   const setRegisterError = (message: string) => {
      ufRegister.setError("server", { type: "server", message });
   }

   const registerSubmitHandle = () => {
      RegisterAuthAction(dispatch, {
         name: ufRegister.getValues('name'),
         phone: ufRegister.getValues('phone').replace(/\s/g, ''),
         email: ufRegister.getValues('email'),
         password: ufRegister.getValues('password')
      }, locale, setRegisterError, closeClickHandler);
   }

   const clearForm = (register: boolean) => {
      if (register) {
         ufRegister.setValue("name", "", { shouldValidate: true });
         ufRegister.setValue("phone", "", { shouldValidate: true });
         ufRegister.setValue("email", "", { shouldValidate: true });
         ufRegister.setValue("password", "", { shouldValidate: true });
      } else {
         ufLogin.setValue("login", "", { shouldValidate: true });
         ufLogin.setValue("loginPassword", "", { shouldValidate: true });
         setRememberMe(false);
      }
      ufRegister.clearErrors();
      ufLogin.clearErrors();
   }

   const registerClickHandler = (e: MouseEvent) => {
      e.preventDefault();
      clearForm(Register);
      setRegister(!Register);
   }

   const rememberMeOnChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked);
   }

   return (
      <div ref={backdrop} className={`dialog-wrapper dialog-backdrop${mainCtx.stateProfile[0] ? " show" : ""}`} onClick={backdropClickHandler} onMouseDown={backdropMouseDownHandler} onMouseUp={backdropMouseUpHandler}>
         <div className="dialog">
            <div className={`register-panel${Register ? " show" : ""}`}>
               <div className="dialog-header">
                  <h2 className="dialog-header-title">{translate('auth.register.title', locale)}</h2>
                  <svg className="bt-close" onClick={closeClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                     <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                  </svg>
               </div>
               <div className="dialog-body login">
                  <form className="dialog-form" onSubmit={ufRegister.handleSubmit(registerSubmitHandle)}>
                     <div className="form-row">
                        <label htmlFor="name" className="form-label">{translate('auth.register.name', locale)}</label>
                        <input
                           {...ufRegister.register("name")}
                           id="name"
                           className={`custom-input${ufRegister.formState.errors.name ? ' error-color' : ''}`}
                           type="text"
                           maxLength={50}
                        />
                        <div className="error-row">
                           {<p className="error-message">{ufRegister.formState.errors.name?.message}</p>}
                        </div>
                     </div>
                     <div className="form-row">
                        <label htmlFor="phone" className="form-label">{translate('auth.register.phone', locale)}</label>
                        <InputMask
                           {...ufRegister.register("phone")}
                           id="phone"
                           className={`custom-input${ufRegister.formState.errors.phone ? ' error-color' : ''}`}
                           mask="+38 999 999 99 99"
                           maskPlaceholder=''
                           alwaysShowMask={true}
                        />
                        <div className="error-row">
                           {<p className="error-message">{ufRegister.formState.errors.phone?.message}</p>}
                        </div>
                     </div>
                     <div className="form-row">
                        <label htmlFor="email" className="form-label">{translate('auth.register.email', locale)}</label>
                        <input
                           {...ufRegister.register("email")}
                           id="email"
                           className={`custom-input${ufRegister.formState.errors.email ? ' error-color' : ''}`}
                           type="email"
                           maxLength={50}
                        />
                        <div className="error-row">
                           {<p className="error-message">{ufRegister.formState.errors.email?.message}</p>}
                        </div>
                     </div>
                     <div className="form-row">
                        <label htmlFor="password" className="form-label">{translate('auth.register.password', locale)}</label>
                        <input
                           {...ufRegister.register("password")}
                           id="password"
                           className={`custom-input${ufRegister.formState.errors.password ? ' error-color' : ''}`}
                           type="password"
                           maxLength={500}
                        />
                        <div className="error-row">
                           {<p className="error-message">{ufRegister.formState.errors.password?.message}</p>}
                        </div>
                     </div>
                     <div className="form-row">
                        {ufRegister.formState.errors.server && <Alert
                           severity="error"
                           onClose={() => { ufRegister.clearErrors(); }}>
                           {ufRegister.formState.errors.server?.message}
                        </Alert>}
                     </div>
                     <button className="custom-button" disabled={!ufRegister.formState.isValid} >{translate('auth.register.register', locale)}</button>
                  </form>
                  <button className="form-register" onClick={registerClickHandler}>{translate('auth.login.title', locale)}</button>
               </div>
            </div>
            <div className={`login-panel${!Register ? " show" : ""}`}>
               <div className="dialog-header">
                  <h2 className="dialog-header-title">{translate('auth.login.title', locale)}</h2>
                  <svg className="bt-close" onClick={closeClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                     <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                  </svg>
               </div>
               <div className="dialog-body login">
                  <form className="dialog-form" onSubmit={ufLogin.handleSubmit(loginSubmitHandle)}>
                     <div className="form-row">
                        <label htmlFor="auth-login" className="form-label">{translate('auth.login.name', locale)}</label>
                        <input
                           {...ufLogin.register("login")}
                           id="auth-login"
                           className={`custom-input${ufLogin.formState.errors.login ? ' error-color' : ''}`}
                           type="text"
                           maxLength={50}
                        />
                        <div className="error-row">
                           {<p className="error-message">{ufLogin.formState.errors.login?.message}</p>}
                        </div>
                     </div>
                     <div className="form-row">
                        <label htmlFor="auth-pass" className="form-label">{translate('auth.login.password', locale)}</label>
                        <input
                           {...ufLogin.register("loginPassword")}
                           id="auth-pass"
                           className={`custom-input${ufLogin.formState.errors.loginPassword ? ' error-color' : ''}`}
                           type="password"
                           maxLength={500}
                        />
                        <div className="error-row">
                           {<p className="error-message">{ufLogin.formState.errors.loginPassword?.message}</p>}
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
                        {ufLogin.formState.errors.server && <Alert
                           severity="error"
                           onClose={() => { ufLogin.clearErrors(); }}>
                           {ufLogin.formState.errors.server?.message}
                        </Alert>}
                     </div>
                     <button className="custom-button" disabled={!ufLogin.formState.isValid}>{translate('auth.login.enter', locale)}</button>
                  </form>
                  <button className="form-register" onClick={registerClickHandler}>{translate('auth.register.title', locale)}</button>
               </div>
            </div>
            <style jsx>{`
               .register-panel {
                  display:none;
               }
               .register-panel.show {
                  display:block;
               }
               .login-panel {
                  display:none;
               }
               .login-panel.show {
                  display:block;
               }
            `}
            </style>
         </div>
      </div >
   )
}

export default DialogLogin