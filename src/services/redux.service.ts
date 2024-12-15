import { GetCartAction, useAppDispatch, useAppSelector } from "../redux"
import { GetMenuAction } from "../redux/menuSlice"

export const reduxService = {

    getMenu () {
        const menu = useAppSelector((state: any) => state.menu)
        if (!menu.started) useAppDispatch()(GetMenuAction(menu))
        return menu
    },

    getCart() {
        const cart = useAppSelector((state: any) => state.cart)
        if (!cart.started) useAppDispatch()(GetCartAction(cart))
        return cart
    }

}