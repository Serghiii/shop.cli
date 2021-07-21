import axios from 'axios';
import decode from 'jwt-decode';
import { useCookie } from "next-cookie";
import React, { Dispatch, useContext, useReducer } from "react";
import { AuthAction } from './auth-action';

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

function reducer(state: State = newAuth, action: Action) {
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

interface IStore {
   authState: [State, Dispatch<Action>];
}

const AuthContext = React.createContext<IStore | undefined>(undefined);
const AuthProvider: React.FC = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, newAuth)
   const store: IStore = {
      authState: [state, dispatch]
   }
   return (
      <AuthContext.Provider value={store} >
         {children}
      </AuthContext.Provider>
   )
}

export const useAuthContext = () => {
   const authContext = useContext(AuthContext)
   if (!authContext) {
      throw new Error('useAuthContext must be used within the AuthContext.Provider');
   }
   return authContext;
}

export default AuthProvider
