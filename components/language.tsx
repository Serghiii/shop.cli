import axios from "axios"
import { useCookie } from "next-cookie"
import Link from "next/link"
import { useRouter } from "next/router"

const Language: React.FC<any> = props => {
   const { locale, asPath } = useRouter()
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
               (<Link href={asPath} locale={'ru'} lang='ru' onClick={onClick}>
                  Рус
               </Link>)
            }
         </li>
         <li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
            {locale === 'uk' ?
               (<span>Укр</span>) :
               (<Link href={asPath} locale={'uk'} lang='uk' onClick={onClick}>
                  Укр
               </Link>)
            }
         </li>
      </ul>
   )
}

export default Language