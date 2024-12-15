'use client'
import { useCookie } from "next-cookie"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { useRouter } from "next/navigation"

const Language: React.FC<any> = props => {
   // const { asPath  } = useRouter()
   const locale:string = 'uk'
   const pathname = usePathname()
   const cookies = useCookie();

   const onClick = (e: any) => {
      let expDate = new Date()
      expDate.setDate(expDate.getDate() + 30)
      cookies.set("NEXT_LOCALE", e.target.lang, { expires: expDate })
   }

   return (
      <ul className="language">
         <li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
            {locale === 'ru' ?
               (<span>Рус</span>) :
               (<Link href={/*asPath*/pathname} locale={'ru'} lang='ru' onClick={onClick}>
                  Рус
               </Link>)
            }
         </li>
         <li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
            {locale === 'uk' ?
               (<span>Укр</span>) :
               (<Link href={/*asPath*/pathname} locale={'uk'} lang='uk' onClick={onClick}>
                  Укр
               </Link>)
            }
         </li>
      </ul>
   )
}

export default Language