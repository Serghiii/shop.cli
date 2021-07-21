import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { SmaSubmenu } from './categorysubmenus';

const Categories: React.FC<any> = props => {

   const fetcher = async (url: string) => await axios.get(url).then(response => response.data)
   const { data } = useSWR('categories', fetcher);

   const getSubItem: any = (ref: string) => {
      switch (ref) {
         case '/smartphones-mobiles-accessories': return <SmaSubmenu />;
         default: return undefined
      }
   }

   return (
      <nav ref={props.categories} className={"categories"}>
         <ul className="categories-list">
            {data?.map((item: any) => (
               <li className="category-item">
                  <Link href={item.ref}>
                     <a className="category-item__link">
                        <div className="link__icon">
                           <Image src={`${process.env.STATIC_URL}/categories/${item.pic}` as any} width={120} height={120} alt={item.name} />
                        </div>
                        <span className="link__title">{item.name}</span>
                        <svg viewBox="0 0 6 9" className="link__arrow">
                           <path d="M0 0.7L3.5 4.4L0 8.4L0.8 9L5 4.4L0.8 0L0 0.7Z" transform="translate(0.994141)"></path>
                        </svg>
                     </a>
                  </Link>
                  {getSubItem(item.ref)}
               </li>
            ))}
         </ul>
      </nav>
   )
}

export default Categories