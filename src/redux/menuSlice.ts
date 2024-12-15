import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosService } from '../services/axios.service'

interface MenuState {
   categories: any
   groups: any
   subgroups: any
   started: boolean
   isLoading: boolean
   error: Error | null
}
 
interface Error {
   code?: string,
   message: string
}

const initialState: MenuState = {
   categories: null,
   groups: null,
   subgroups: null,
   started: false,
   isLoading: false,
   error: null
}

export const GetMenuAction = createAsyncThunk(
   'menu/GetMenuAction',
   async (action: MenuState, { rejectWithValue }) => {
      try {
         if (!action.started) {
            return await (await axiosService.get("service/menu")).data
         } else {
            return action
         }
      } catch (e: any) {
         return rejectWithValue(<Error>{
            code: (e.response ? (e.response.status ? e.response.data.error : e.code) : e.error),
            message: (e.response ? (e.response.status ? e.response.data.message : e.message) : e.message)
         })
      }
   }
)

export const menuSlice = createSlice({
   name: 'menu',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(GetMenuAction.fulfilled, (state, action) => {
            state.categories = action.payload.categories
            state.groups = action.payload.groups
            state.subgroups = action.payload.subgroups
            state.started = true
            state.isLoading = false
            state.error = null
         })
         .addCase(GetMenuAction.pending, (state) => {
            state.isLoading = true
         })
         .addCase(GetMenuAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = <Error>action.payload
         })
   },
})

export default menuSlice.reducer