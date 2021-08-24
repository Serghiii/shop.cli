import React, { Dispatch, useContext, useReducer } from "react";

export enum CartAction {
   AddItem,
   AdjustAmount,
   RemoveItem
}

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

export const MAX_AMOUNT_PER_ITEM = 99;
const initialState: [] = getCart() || [];

function reducer(state: any, action: any) {
   let cartState;
   const { id } = action.payload;
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

interface IStore {
   cartState: [State, Dispatch<Action>];
}

const CartContext = React.createContext<any | undefined>(undefined);
const CartProvider: React.FC = ({ children }: any) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const store: IStore = {
      cartState: [state, dispatch]
   }
   return (
      <CartContext.Provider value={store}>
         {children}
      </CartContext.Provider>
   );
};

export const useCartContext = () => {
   const cartContext = useContext(CartContext)
   if (!cartContext) {
      throw new Error('useCartContext must be used within the CartContext.Provider');
   }
   return cartContext;
}

export default CartProvider