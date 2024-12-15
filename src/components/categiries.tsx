'use client'
import Link from 'next/link';
import { CategorySubmenu } from '.';
import { tt } from '../common/utils';
import { reduxService } from '../services';

const Categories: React.FC<any> = props => {
   const menu = reduxService.getMenu()
   // const { locale } = useRouter()
   const locale:string='uk'

   const getSubItem: any = (ref: string) => {
      switch (ref) {
         case 'smartphones-mobiles-accessories': return <CategorySubmenu />;
         default: return undefined
      }
   }

   typeof window !== 'undefined'

   return (
      <nav ref={props.categories} className={"categories"}>
         <ul className="categories-list">
            {window && menu?.started && menu?.categories.map((item: any) => (
               <li key={item.ref} className="category-item">
                  <Link href={`/groups/${item.ref}`} locale={locale} className="category-item__link">
                     <img src={`${process.env.STATIC_URL}/categories/${item.pic}`} className="link__icon" alt={item.name} />
                     <span className="link__title">{tt(item.name, locale)}</span>
                     <svg viewBox="0 0 6 9" className="link__arrow">
                        <path d="M0 0.7L3.5 4.4L0 8.4L0.8 9L5 4.4L0.8 0L0 0.7Z" transform="translate(0.994141)"></path>
                     </svg>
                  </Link>
                  {getSubItem(item.ref)}
               </li>
            ))}
         </ul>
      </nav>
   )
}

export default Categories