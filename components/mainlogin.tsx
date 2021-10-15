import React, { ChangeEvent, FormEvent, useState } from "react"
import Image from 'next/image';
import User from '../public/icon/profile/user-login.svg';
import { LoginAuthAction, useAuthContext } from "../contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { translate } from '../locales/translate';
import { useRouter } from "next/router";

const MainLogin: React.FC = () => {
   const { locale } = useRouter()
   const dispatch = useAuthContext().authState[1];
   const [rememberme, setRememberMe] = useState(false);

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

   const rememberMeOnChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked);
   }

   const setLoginError = (message: string) => {
      ufLogin.setError("server", { type: "server", message });
   }

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      LoginAuthAction(dispatch, {
         username: ufLogin.getValues('login'),
         password: ufLogin.getValues('loginPassword'),
         rememberme
      }, locale, setLoginError);
   }

   return (
      <div className="form-login">
         <div className="avatar-login">
            <Image src={User} alt="" />
         </div>
         <h2>{translate('auth.login.title', locale)}</h2>
         <form className="dialog-form" onSubmit={onSubmit}>
            <div className="form-row">
               <label htmlFor="auth-login" className="form-label" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', WebkitLineClamp: 1, overflow: 'hidden', whiteSpace: 'normal' }}>{translate('auth.login.name', locale)}</label>
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
      </div >
   )
}
export default MainLogin