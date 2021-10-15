import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const SmaSubmenu: React.FC = () => {
   const { locale } = useRouter()
   const t = locale === 'ru' ? 'ru' : 'uk'

   const items = {
      uk: {
         phones: {
            title: 'Телефони',
            content: { smartphones: 'Смартфони', mobiles: 'Мобільні телефони', phones: 'Офісні телефони' }
         },
         acsesuary: {
            title: 'Аксессуари',
            content: {
               chohly: 'Чохли для смартфонів', sklo: 'Захисне скло і плівки',
               batarei: 'Портативні батареї', navushnyky: 'Навушники', akustyka: 'Портативна акустика'
            }
         },
         brendy: {
            title: 'За брендами'
         }
      },
      ru: {
         phones: {
            title: 'Телефоны',
            content: { smartphones: 'Смартфоны', mobiles: 'Мобильные телефоны', phones: 'Офисные телефоны' }
         },
         acsesuary: {
            title: 'Аксессуары',
            content: {
               chohly: 'Чехлы для смартфонов', sklo: 'Защитное стекло и пленка',
               batarei: 'Портативные батареи', navushnyky: 'Наушники', akustyka: 'Портативная акустика'
            }
         },
         brendy: {
            title: 'Бренды'
         }
      }
   }


   return (
      <div className="category-item__link-submenu">
         <div className="submenu-wraper">
            <ul className="submenu-list">
               <li className="submenu-item">
                  <p className="submenu-item__title">{items[t].phones.title}</p>
               </li>
               <li className="submenu-item">
                  <Link href="/smartphones" locale={locale}>
                     <a className="submenu-item__link">{items[t].phones.content.smartphones}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/mobiles" locale={locale}>
                     <a className="submenu-item__link">{items[t].phones.content.mobiles}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/phones" locale={locale}>
                     <a className="submenu-item__link">{items[t].phones.content.phones}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <p className="submenu-item__title">{items[t].acsesuary.title}</p>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">{items[t].acsesuary.content.chohly}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">{items[t].acsesuary.content.sklo}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">{items[t].acsesuary.content.batarei}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">{items[t].acsesuary.content.navushnyky}</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">{items[t].acsesuary.content.akustyka}</a>
                  </Link>
               </li>
            </ul>
            <ul className="submenu-list">
               <li className="submenu-item">
                  <p className="submenu-item__title">{items[t].brendy.title}</p>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Apple</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Samsung</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Realme</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Xiaomi</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">OnePlus</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">OPPO</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Huawei</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">ZTE</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Vivo</a>
                  </Link>
               </li>
               <li className="submenu-item">
                  <Link href="/" locale={locale}>
                     <a className="submenu-item__link">Motorola</a>
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   )
}
export default SmaSubmenu