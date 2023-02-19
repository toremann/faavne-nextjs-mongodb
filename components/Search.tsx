const Search = ({ query, setQuery, handleFilter, filter }: any) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <div className="form-group">
              <label htmlFor="search-input">Søk:</label>
              <div className="input-group">
                <input type="text" className="form-control" id="search-input" placeholder="Aksje navn eller symbol.." value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="toggle-switch" checked={filter} onChange={handleFilter} />
                <label className="form-check-label" htmlFor="toggle-switch">
                  Vis kun aksjer med utbytte dato
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
