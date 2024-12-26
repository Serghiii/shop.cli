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
import { useAppDispatch, useAppSelector, LoginAuthAction, ErrorUpdate } from "../redux";
import { useDictionary } from "../contexts";

const MainLogin: React.FC = () => {
   const { d,t } = useDictionary()
   const dispatch = useAppDispatch();
   const auth = useAppSelector((state: any) => state.auth);
   const [rememberme, setRememberMe] = useState(false);

   const loginSchema = yup.object().shape({
      login: yup.string().trim()
         .required(d.auth.messages.required)
         .min(2, d.auth.messages.login),
      loginPassword: yup.string()
         .required(d.auth.messages.required)
         .min(6, d.auth.messages.password)
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
         <h2>{d.auth.login.title}</h2>
         <form className="dialog-form" onSubmit={onSubmitHandler}>
            <div className="form-row">
               <label htmlFor="auth-login" className="form-label" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', WebkitLineClamp: 1, overflow: 'hidden', whiteSpace: 'normal' }}>{d.auth.login.name}</label>
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
               <label htmlFor="auth-pass" className="form-label">{d.auth.login.password}</label>
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
                  label={d.auth.login.rememberme}
               />
            </FormGroup>
            <div className="form-row">
               {auth.error?.message && <Alert
                  severity="error"
                  onClose={() => { dispatch(ErrorUpdate({ code: '', message: '' })) }}>
                  { t('server.'+auth.error.code) ? t('server.'+auth.error.code) : auth.error.message }
               </Alert>}
            </div>
            <button className="custom-button" disabled={!isValid}>{d.auth.login.enter}</button>
         </form>
      </div >
   )
}

export default MainLogin