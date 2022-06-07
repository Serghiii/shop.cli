import axios from "axios";
import { CartAction } from ".";

type Action = {
   type: CartAction,
   payload: any
}

type State = {
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

const getIDs: any = (cartRows: number[]) => {
   let data: number[] = []
   cartRows.forEach((el: any) => {
      data.push(el.id)
   });
   return { data }
}

const getData: any = (ids: number[]) => {
   let res: any = []
   axios.post('products/cart', ids).then(({ data }) => {
      data.forEach((el: any) => {
         res.push(el)
      })
   })
   return res
}

axios.defaults.baseURL = process.env.API_URL;

export const MAX_AMOUNT_PER_ITEM = 99;
const initialState: [] = getCart() || [];

const cartreducer = (state: State[] = initialState, action: Action) => {
   let cartState;
   const id = action.payload?.id;
   switch (action.type) {
      case CartAction.AddItem:
         const entry = state.find((item: any) => item.id === id);
         if (entry) {
            return state.map((item: any) => {
               if (item.id === id) {
                  return {
                     ...item,
                     amount: Math.min(item.amount + 1, MAX_AMOUNT_PER_ITEM),
                  };
               }
               return item;
            });
         }
         cartState = [...state, { id, amount: 1 }]
         localStorage.setItem("cart", JSON.stringify(cartState));
         return cartState;
      case CartAction.AdjustAmount:
         const { amount } = action.payload;
         cartState = state.map((item: any) => {
            if (item.id === id) {
               return {
                  ...item,
                  amount: Math.min(amount, MAX_AMOUNT_PER_ITEM),
               };
            }
            return item;
         });
         localStorage.setItem("cart", JSON.stringify(cartState));
         return cartState;
      case CartAction.RemoveItem:
         cartState = state.filter((item: any) => item.id !== id);
         localStorage.setItem("cart", JSON.stringify(cartState));
         return cartState;
      default:
         return state;
   }
}

export default cartreducer