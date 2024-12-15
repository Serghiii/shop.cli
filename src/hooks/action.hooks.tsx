'use client'
import { useMemo } from "react";
import { useAppDispatch, AddItem, AdjustAmount, ErrorUpdate, GetCartAction, GoogleAuthAction, LoginAuthAction, LogoutAuthAction, RegisterAuthAction, RemoveItem } from "../redux";
import { bindActionCreators } from "redux";

const rootActions = {
    AddItem,
    AdjustAmount,
    ErrorUpdate,
    GetCartAction,
    GoogleAuthAction,
    LoginAuthAction,
    LogoutAuthAction,
    RegisterAuthAction,
    RemoveItem
}

export const useActions = () =>{
    const dispatch = useAppDispatch()
    return useMemo(()=> bindActionCreators(rootActions, dispatch), [dispatch])
}