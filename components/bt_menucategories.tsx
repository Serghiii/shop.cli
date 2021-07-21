import React from "react"
import { Categories } from "./index"

const MenuCategoriesButton: React.FC = () => {
   return (
      <div className="menu-categories">
         <div className="categories-title">
            <i className="burger"></i>
            Категорії
         </div>
         <Categories />
         <div className="menu-backdrop idx"></div>
      </div>
   )
}

export default MenuCategoriesButton