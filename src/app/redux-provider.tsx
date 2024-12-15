'use client'
import { Provider } from "react-redux"
import { store } from "../redux"
// import { persistStore } from "redux-persist"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}