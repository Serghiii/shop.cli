import { useAppDispatch, useAppSelector } from "../redux"
import { GetMenuAction } from "../redux/menuSlice"

export const reduxService = {

    getMenu () {
        const menu = useAppSelector((state: any) => state.menu)
        if (!menu.started) useAppDispatch()(GetMenuAction(menu))
        return menu
    }

}