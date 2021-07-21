import React, { Dispatch, useContext, useReducer } from "react";

enum CartAction {
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

export const MAX_AMOUNT_PER_ITEM = 5;
const initialState: [] = [];

function reducer(state: any, action: any) {
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
         return [...state, { id, amount: 1 }];
      case CartAction.AdjustAmount:
         const { amount } = action.payload;
         return state.map((item: any) => {
            if (item.id === id) {
               return {
                  ...item,
                  amount: Math.min(amount, MAX_AMOUNT_PER_ITEM),
               };
            }
            return item;
         });
      case CartAction.RemoveItem:
         return state.filter((item: any) => item.id !== id);
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