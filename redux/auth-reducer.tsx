import axios from 'axios';
import decode from 'jwt-decode';
import { useCookie } from "next-cookie";
import { AuthAction } from './types'

type Action = {
   type: AuthAction,
   payload: any
}

type State = {
   isLoggedIn: boolean;
   token: string;
   name: string;
   avatar: string;
}

const initialState: State = {
   isLoggedIn: false,
   token: '',
   name: '',
   avatar: ''
};

const getAuthState = () => {
   const cookies = useCookie();
   const auth: State = cookies.get("auth");
   try {
      const decoded: any = decode(auth.token);
      if (decoded.exp < Date.now() / 1000) {
         return initialState;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      return auth;
   } catch (e) {
      return initialState;
   }
};

const newAuth = getAuthState();

const authreducer = (state: State = newAuth, action: Action) => {
   const cookies = useCookie();
   switch (action.type) {
      case AuthAction.LoginSuccess:
         const decoded: any = decode(action.payload.token);
         const loginState: State = {
            isLoggedIn: true,
            token: action.payload.token,
            name: decoded.profile.name,
            avatar: decoded.profile.avatar,
         };
         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${action.payload.token}`;
         cookies.set("auth", loginState, { expires: new Date(decoded.exp * 1000) });
         return loginState;
      case AuthAction.LogoutSuccess:
         cookies.remove("auth");
         return initialState;
      case AuthAction.RegisterSuccess:
         return state;
      default:
         return state;
   }
}

export default authreducer