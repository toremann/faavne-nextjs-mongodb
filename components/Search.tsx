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
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="button" className="btn btn-outline-primary">
        search
      </button>
    </div>
  );
};

export default Search;
