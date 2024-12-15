'use client'
import { Categories } from "./index"
// import { useTranslation } from "./translatation"

const MenuCategoriesButton: React.FC = () => {
   // const { t, locale } = useTranslation()

   return (
      <div className="menu-categories">
         <div className="categories-title">
            <i className="burger"></i>
            {/*t('categories.title')*/'undefined'}
         </div>
         <Categories />
         <div className="menu-backdrop idx"></div>
      </div>
   )
}

export default MenuCategoriesButton