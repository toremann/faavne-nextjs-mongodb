const Search = ({ query, setQuery, handleFilter, filter }: any) => {
  return (
    <div className="mb-4">
      <div className="input-group d-flex flex-row">
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
      <div className="form-check form-switch d-flex flex-row">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={filter} onChange={handleFilter} />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          EX / DD
        </label>
      </div>
    </div>
  );
};

export default Search;
