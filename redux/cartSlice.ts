import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
   id: number;
   amount: number;
}

const getCart = () => {
   let cart: any
   try {
      cart = localStorage.getItem("cart");
   }
   catch (e: any) {
      return null
   }
   return JSON.parse(cart)
}

export const MAX_AMOUNT_PER_ITEM = 99;
const initialState: CartState[] = getCart() || []

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      AddItem: (state: CartState[], action: PayloadAction<CartState>) => {
         const entry = state.find((item: any) => item.id === action.payload.id);
         if (entry) {
            return state.map((item: any) => {
               if (item.id === action.payload.id) {
                  return {
                     ...item,
                     amount: Math.min(item.amount + 1, MAX_AMOUNT_PER_ITEM),
                  };
               }
               return item;
            });
         }
         let cartState = [...state, { id: action.payload.id, amount: 1 }]
         localStorage.setItem("cart", JSON.stringify(cartState))
         return cartState
      },
      AdjustAmount: (state: CartState[], action: PayloadAction<CartState>) => {
         const { amount } = action.payload;
         let cartState = state.map((item: any) => {
            if (item.id === action.payload.id) {
               return {
                  ...item,
                  amount: Math.min(amount, MAX_AMOUNT_PER_ITEM),
               };
            }
            return item;
         });
         localStorage.setItem("cart", JSON.stringify(cartState))
         return cartState
      },
      RemoveItem: (state: CartState[], action: PayloadAction<CartState>) => {
         let cartState = state.filter((item: any) => item.id !== action.payload.id);
         localStorage.setItem("cart", JSON.stringify(cartState));
         return cartState
      },
   },
})

export const { AddItem, AdjustAmount, RemoveItem } = cartSlice.actions
export default cartSlice.reducer