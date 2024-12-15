import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import { useCookie } from 'next-cookie'
import { axiosService } from '../services/axios.service'

interface User {
   name: string
   phone: string
   email: string
   password: string
}

interface PUser extends User {
   activation_on: string
   activation_ref: string
}

interface Login {
   username: string
   password: string
   rememberme?: boolean
}

interface Google {
   token: string
}

interface Auth {
   isLoggedIn: boolean
   token: string
   name: string
   avatar: string
}

interface Error {
   code?: string
   message: string
}

interface AuthState {
   user: Auth
   isLoading: boolean
   error: Error | null
}

const initialState: AuthState = {
   user: {
      isLoggedIn: false,
      token: '',
      name: '',
      avatar: ''
   },
   isLoading: false,
   error: null
}

const getAuthState = () => {
   const cookies = useCookie();
   const user: Auth = cookies.get("auth")
   try {
      const decoded: any = jwtDecode(user.token);
      if (decoded.exp < Date.now() / 1000) {
         return initialState
      }
      // axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`
      return <AuthState>{
         user,
         isLoading: false,
         error: null
      }
   } catch (e) {
      return initialState
   }
}

const setLogin = (token: string): AuthState => {
   const decoded: any = jwtDecode(token)
   const user: Auth = {
      isLoggedIn: true,
      token: token,
      name: decoded.profile.name,
      avatar: decoded.profile.avatar
   }
   // axios.defaults.headers.common[
   //    "Authorization"
   // ] = `Bearer ${token}`
   // useCookie().set("auth", user, { expires: new Date(decoded.exp * 1000) })
   return <AuthState>{
      user,
      isLoading: false,
      error: null
   }
}

export const RegisterAuthAction = createAsyncThunk(
   'auth/RegisterAuthAction',
   async (action: PUser, { rejectWithValue }) => {
      try {
         return await (await axiosService.post("auth/register", action)).data
      } catch (e: any) {
         return rejectWithValue(<Error>{
            code: (e.response ? (e.response.status ? e.response.data.error : e.code) : e.error),
            message: (e.response ? (e.response.status ? e.response.data.message : e.message) : e.message)
         })
      }
   }
)

export const LoginAuthAction = createAsyncThunk(
   'auth/LoginAuthAction',
   async (action: Login, { rejectWithValue }) => {
      try {
         return await (await axiosService.post("auth/login", action)).data
      } catch (e: any) {
         return rejectWithValue(<Error>{
            code: (e.response ? (e.response.status ? e.response.data.error : e.code) : e.error),
            message: (e.response ? (e.response.status ? e.response.data.message : e.message) : e.message)
         })
      }
   }
)

export const LogoutAuthAction = createAsyncThunk(
   'auth/LogoutAuthAction',
   async (_, { rejectWithValue }) => {
      try {
         useCookie().remove("auth");
      } catch (e: any) {
         return rejectWithValue(<Error>{
            code: (e.response ? (e.response.status ? e.response.data.error : e.code) : e.error),
            message: (e.response ? (e.response.status ? e.response.data.message : e.message) : e.message)
         })
      }
   }
)

export const GoogleAuthAction = createAsyncThunk(
   'auth/GoogleAuthAction',
   async (state: Google, { rejectWithValue }) => {
      try {
         return await (await axiosService.post("auth/google", state)).data
      } catch (e: any) {
         return rejectWithValue(<Error>{
            code: (e.response ? (e.response.status ? e.response.data.error : e.code) : e.error),
            message: (e.response ? (e.response.status ? e.response.data.message : e.message) : e.message)
         })
      }
   }
)

export const authSlice = createSlice({
   name: 'auth',
   initialState: getAuthState(),
   reducers: {
      ErrorUpdate: (state, action) => {
         state.error = <Error>action.payload
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(RegisterAuthAction.fulfilled, (state) => {
            state.isLoading = false
            state.error = null
         })
         .addCase(RegisterAuthAction.pending, (state) => {
            state.isLoading = true
         })
         .addCase(RegisterAuthAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = <Error>action.payload
         })
         .addCase(LoginAuthAction.fulfilled, (_, action) => {
            return setLogin(action.payload.token)
         })
         .addCase(LoginAuthAction.pending, (state) => {
            state.isLoading = true
         })
         .addCase(LoginAuthAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = <Error>action.payload
         })
         .addCase(GoogleAuthAction.fulfilled, (_, action) => {
            return setLogin(action.payload.token)
         })
         .addCase(GoogleAuthAction.pending, (state) => {
            state.isLoading = true
         })
         .addCase(GoogleAuthAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = <Error>action.payload
         })
         .addCase(LogoutAuthAction.fulfilled, () => {
            return initialState
         })
   },
})

export const { ErrorUpdate } = authSlice.actions
export default authSlice.reducer