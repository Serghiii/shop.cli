import React, { MouseEvent, FormEvent, useRef, useState, ChangeEvent } from "react";
import InputMask from "react-input-mask";
import { LoginAuthAction, RegisterAuthAction, useAuthContext, useMainContext } from "../contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { Messages } from "../src/messages";

const DialogLogin: React.FC = () => {
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
         .required(Messages.ua.required)
         .min(2, Messages.ua.login),
      loginPassword: yup.string()
         .required(Messages.ua.required)
         .min(6, Messages.ua.password)
   });

   const ufLogin = useForm({
      mode: "onChange",
      resolver: yupResolver(loginSchema)
   });

   const registerSchema = yup.object().shape({
      name: yup.string().trim()
         .required(Messages.ua.required)
         .matches(/^[а-яА-ЯіІёЁ\s]+$/, "Введіть своє ім'я кирилицею"),
      phone: yup.string()
         .matches(/^\+38\s[0-9,\s]+$/, Messages.ua.required)
         .matches(/^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, Messages.ua.phone),
      email: yup.string()
         .required(Messages.ua.required)
         .email(Messages.ua.email),
      password: yup.string()
         .required(Messages.ua.required)
         .min(6, Messages.ua.password)
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

   const loginSubmitHandle = (e: FormEvent) => {
      LoginAuthAction(dispatch, {
         username: ufLogin.getValues('login'),
         password: ufLogin.getValues('loginPassword'),
         rememberme
      }, setLoginError, closeClickHandler);
   }

   const setRegisterError = (message: string) => {
      ufRegister.setError("server", { type: "server", message });
   }

   const registerSubmitHandle = (e: FormEvent) => {
      RegisterAuthAction(dispatch, {
         name: ufRegister.getValues('name'),
         phone: ufRegister.getValues('phone').replace(/\s/g, ''),
         email: ufRegister.getValues('email'),
         password: ufRegister.getValues('password')
      }, setRegisterError, closeClickHandler);
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
                  <h2 className="dialog-header-title">Реєстрація</h2>
                  <svg className="bt-close" onClick={closeClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                     <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                  </svg>
               </div>
               <div className="dialog-body login">
                  <form className="dialog-form" onSubmit={ufRegister.handleSubmit(registerSubmitHandle)}>
                     <div className="form-row">
                        <label htmlFor="name" className="form-label">Ім&apos;я</label>
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
                        <label htmlFor="phone" className="form-label">Номер телефону</label>
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
                        <label htmlFor="email" className="form-label">Ел. пошта</label>
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
                        <label htmlFor="password" className="form-label">Пароль</label>
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
                     <button className="custom-button" disabled={!ufRegister.formState.isValid} >Зареєструватися</button>
                  </form>
                  <button className="form-register" onClick={registerClickHandler}>Вхід</button>
               </div>
            </div>
            <div className={`login-panel${!Register ? " show" : ""}`}>
               <div className="dialog-header">
                  <h2 className="dialog-header-title">Вхід</h2>
                  <svg className="bt-close" onClick={closeClickHandler} viewBox="0 0 413.348 413.348" height="15px" width="15px">
                     <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                  </svg>
               </div>
               <div className="dialog-body login">
                  <form className="dialog-form" onSubmit={ufLogin.handleSubmit(loginSubmitHandle)}>
                     <div className="form-row">
                        <label htmlFor="auth-login" className="form-label">Електронна пошта або телефон</label>
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
                        <label htmlFor="auth-pass" className="form-label">Пароль</label>
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
                           label="Запам'ятати"
                        />
                     </FormGroup>
                     <div className="form-row">
                        {ufLogin.formState.errors.server && <Alert
                           severity="error"
                           onClose={() => { ufLogin.clearErrors(); }}>
                           {ufLogin.formState.errors.server?.message}
                        </Alert>}
                     </div>
                     <button className="custom-button" disabled={!ufLogin.formState.isValid}>Увійти</button>
                  </form>
                  <button className="form-register" onClick={registerClickHandler}>Зареєструватися</button>
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