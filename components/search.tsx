import { useRouter } from "next/router"

const Search: React.FC = () => {
   const { locale } = useRouter()
   return (
      <div className="search">
         <input
            className="search__txt"
            type="text"
            placeholder={locale == 'ru' ? 'Поиск...' : 'Я шукаю...'}
            autoComplete="off" />
         <button className="search__btn"></button>
      </div>
   )
}

export default Search