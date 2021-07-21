import Link from "next/link"
import React from "react"

const SmaSubmenu: React.FC = () => {
   return (
      <div className="category-item__link-submenu">
         <div className="submenu-wraper">
            <ul className="submenu-list">
               <li className="submenu-item">
                  <p className="submenu-item__title">Телефони</p>
               </li>
               <li className="submenu-item">
                  <Link href="/smartphones">
                     <a className="submenu-item__link">Смартфони</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/mobiles">
                     <a className="submenu-item__link">Мобільні телефони</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/phones">
                     <a className="submenu-item__link">Офісні телефони</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <p className="submenu-item__title">Аксессуары</p>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Чохли для смартфонів</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Захисне скло і плівки</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Портативні батареї</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Навушники</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Портативна акустика</a>
                  </Link>
               </li>
            </ul>
            <ul className="submenu-list">
               <li className="submenu-item">
                  <p className="submenu-item__title">За брендами</p>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Apple</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Samsung</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Realme</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Xiaomi</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">OnePlus</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">OPPO</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Huawei</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">ZTE</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Vivo</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/">
                     <a className="submenu-item__link">Motorola</a>
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   )
}
export default SmaSubmenu