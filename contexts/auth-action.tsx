import axios from "axios";

enum AuthAction {
   RegisterSuccess,
   LoginSuccess,
   LogoutSuccess,
   RegisterFail,
   LoginFail,
   LogoutFail
}

const RegisterAuthAction = async (dispatch: any, userState: any, lang: string = 'uk', setErrorHandler: (message: string) => void, onSuccess: any = null) => {
   try {
      const { data } = await axios.post("auth/register", userState, { headers: { lang } });
      dispatch({ type: AuthAction.RegisterSuccess, payload: data });
      if (onSuccess) onSuccess();
   } catch (e: any) {
      dispatch({
         type: AuthAction.RegisterFail,
         payload: e.response ? e.response.data.message : e.message
      });
      setErrorHandler(e.response ? e.response.data.message : e.message);
   }
};

const LoginAuthAction = async (dispatch: any, loginState: any, lang: string = 'uk', setErrorHandler: (message: string) => void, onSuccess: any = null) => {
   try {
      const data = await axios.post("auth/login", loginState, { headers: { lang } });
      dispatch({ type: AuthAction.LoginSuccess, payload: data.data });
      if (onSuccess) onSuccess();
   } catch (e: any) {
      dispatch({
         type: AuthAction.LoginFail,
         payload: e.response ? e.response.data.message : e.message
      });
      setErrorHandler(e.response ? e.response.data.message : e.message);
   }
};

const LogOutAuthAction = async (dispatch: any) => {
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
};

export {
   AuthAction,
   RegisterAuthAction,
   LogOutAuthAction,
   LoginAuthAction
};