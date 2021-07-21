import Link from "next/link"

const Language: React.FC<any> = props => {
   return (
      <ul className="language">
         <li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
            <Link href="/">
               <a>Рус</a>
            </Link>
         </li>
         <li className={props.mobile ? 'language__item-mobile' : 'language__item'}>
            <span>Укр</span>
         </li>
      </ul>
   )
}

export default Language