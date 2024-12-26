'use client'
import { useDictionary } from "../contexts"

const Search: React.FC = () => {
   const {d} = useDictionary()
   
   return (
      <div className="search">
         <input
            className="search__txt"
            type="text"
            placeholder={d.search}
            autoComplete="off" />
         <button className="search__btn">''</button>
      </div>
   )
}

export default Search