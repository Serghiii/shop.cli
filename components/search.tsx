const Search: React.FC = () => {
   return (
      <div className="search">
         <input
            className="search__txt"
            type="text"
            placeholder="Я шукаю..."
            autoComplete="off" />
         <button className="search__btn"></button>
      </div>
   )
}

export default Search