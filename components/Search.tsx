const Search = ({ query, setQuery }: any) => {
  return (
    <div className="input-group mb-4">
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
        type="search"
        className="form-control rounded"
        placeholder="Søk.."
        aria-label="Search"
        aria-describedby="search-addon"
        autoFocus
      />
    </div>
  );
};

export default Search;
