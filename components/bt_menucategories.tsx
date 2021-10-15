import { useRouter } from "next/router"
import React from "react"
import { Categories } from "./index"
import { translate } from '../locales/translate';

const MenuCategoriesButton: React.FC = () => {
   const { locale } = useRouter()

   return (
      <div className="menu-categories">
         <div className="categories-title">
            <i className="burger"></i>
            {translate('categories.title', locale)}
         </div>
         <Categories />
         <div className="menu-backdrop idx"></div>
      </div>
   )
}

export default MenuCategoriesButton