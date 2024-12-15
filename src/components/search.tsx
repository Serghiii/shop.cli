'use client'
// import { useRouter } from "next/router"

const Search: React.FC = () => {
   // const { locale } = useRouter()
   const locale:string = 'uk'
   return (
      <div className="search">
         <input
            className="search__txt"
            type="text"
            placeholder={locale == 'ru' ? 'Поиск...' : 'Я шукаю...'}
            autoComplete="off" />
         <button className="search__btn">''</button>
      </div>
   )
}

export default Search