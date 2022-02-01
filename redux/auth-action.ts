import axios from "axios";
import { AuthAction } from './types'

const RegisterAuthAction = (userState: any, onSuccess: any = null) => {
   return async (dispatch: any) => {
      try {
         const { data } = await axios.post("auth/register", userState);
         dispatch({ type: AuthAction.RegisterSuccess, payload: data });
         if (onSuccess) onSuccess();
      } catch (e: any) {
         dispatch({
            type: AuthAction.RegisterFail,
            payload: e.response ? e.response.data.message : e.message
         });
      }
   }
};

const LoginAuthAction = (loginState: any, onSuccess: any = null) => {
   return async (dispatch: any) => {
      try {
         const data = await axios.post("auth/login", loginState);
         dispatch({ type: AuthAction.LoginSuccess, payload: data.data });
         if (onSuccess) onSuccess();
      } catch (e: any) {
         dispatch({
            type: AuthAction.LoginFail,
            payload: e.response ? e.response.data.message : e.message
         });
      }
   }
};

const GoogleAuthAction = (loginState: any, onSuccess: any = null) => {
   return async (dispatch: any) => {
      try {
         const data = await axios.post("auth/google", loginState);
         dispatch({ type: AuthAction.LoginSuccess, payload: data.data });
         if (onSuccess) onSuccess();
      } catch (e: any) {
         dispatch({
            type: AuthAction.LoginFail,
            payload: e.response ? e.response.data.message : e.message
         });
      }
   }
};

const LogOutAuthAction = () => {
   return async (dispatch: any) => {
      try {
         dispatch({
            type: AuthAction.LogoutSuccess,
            payload: "",
         });
      } catch (e: any) {
         dispatch({
            type: AuthAction.LogoutFail,
            payload: e.response ? e.response.data.message : e.message
         });
      }
   }
};

export {
   RegisterAuthAction,
   LogOutAuthAction,
   LoginAuthAction,
   GoogleAuthAction,
};