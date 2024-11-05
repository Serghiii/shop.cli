import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface LsCart {
   id: number,
   amount: number
}

interface Cart extends LsCart {
   code: number,
   name: string,
   iamount: number,
   price: number,
   priceold: number,
   dcount: number,
   dpercent:number,
   pic: string,
   firm: {}
}

interface CartState {
   cart: Cart[] | LsCart[],
   started: boolean,
   isLoading: boolean,
   error: Error | null
}

interface Error {
   code?: string,
   message: string
}

const getLsCart = (): LsCart[] => {
   let cart: LsCart[]
   try {
      const ls: string | null = localStorage.getItem("cart")
      cart = <LsCart[]>JSON.parse(ls ? ls : '')
   }
   catch (e: any) {
      return []
   }
   return cart
}

const getIDs: any = (val: any) => {
   let data: number[] = []
   val.forEach((el: any) => {
      data.push(el.id)
   });
   return { data }
}

export const MAX_AMOUNT_PER_ITEM = 99;
const initialState: CartState = {
   cart: getLsCart(),
   started: false,
   isLoading: false,
   error: null
}

export const GetCartAction = createAsyncThunk(
   'cart/GetCartAction',
   async (action: CartState, { rejectWithValue }) => {
      if (!action.cart) return action.cart
      try {
         if (!action.started) {
            if (action.cart.length > 0) {
               const data = await (await axios.post("products/cart", getIDs(action.cart))).data
               if (data.length > 0) {
                  return data.map((item1: Cart) => (
                     { ...item1, iamount: action.cart.find((item2: LsCart) => (item2.id === item1.id))?.amount }
                  ))
               }
            }
            return []
         } else {
            return action.cart
         }
      } catch (e: any) {
         return rejectWithValue(<Error>{
            code: (e.response ? (e.response.status ? e.response.data.error : e.code) : e.error),
            message: (e.response ? (e.response.status ? e.response.data.message : e.message) : e.message)
         })
      }
   }
)

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      AddItem: (state: CartState, action: PayloadAction<Cart>) => {
         if (!state.started) return state
         const entry = state.cart.find((item: any) => item.id === action.payload.id)
         if (entry) {
            return {
               ...state, cart: state.cart.map((item: any) => {
                  if (item.id === action.payload.id) {
                     return {
                        ...item,
                        iamount: Math.min(item.iamount + 1, MAX_AMOUNT_PER_ITEM),
                     };
                  }
                  return item
               })
            }
         }
         let cartState: CartState = {
            ...state, cart: [...state.cart, {
               ...action.payload, iamount: 1
            }]
         }
         localStorage.setItem("cart", JSON.stringify(cartState.cart.map((item: any) => {
            return { id: item.id, amount: item.iamount }
         })))
         return cartState
      },
      AdjustAmount: (state: CartState, action: PayloadAction<LsCart>) => {
         if (!state.started) return state
         state.cart = <Cart[]>state.cart.map((item: any) => {
            if (item.id === action.payload.id) {
               return {
                  ...item,
                  iamount: Math.min(action.payload.amount, MAX_AMOUNT_PER_ITEM),
               };
            }
            return item;
         });
         localStorage.setItem("cart", JSON.stringify(state.cart?.map((item: any) => {
            return { id: item.id, amount: item.iamount }
         })))
         return state
      },
      RemoveItem: (state: CartState, action: PayloadAction<number>) => {
         if (!state.started) return state
         let cartState: CartState = state
         cartState.cart = state.cart.filter((item: any) => item.id !== action.payload)
         localStorage.setItem("cart", JSON.stringify(cartState.cart.map((item: any) => {
            return { id: item.id, amount: item.iamount }
         })));
         return cartState
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(GetCartAction.fulfilled, (state, action) => {
            state.cart = <Cart[]>action.payload
            state.started = true
            state.isLoading = false
            state.error = null
         })
         .addCase(GetCartAction.pending, (state) => {
            state.isLoading = true
         })
         .addCase(GetCartAction.rejected, (state, action) => {
            state.isLoading = false
            state.error = <Error>action.payload
         })
   },
})

export const { AddItem, AdjustAmount, RemoveItem } = cartSlice.actions
export default cartSlice.reducer