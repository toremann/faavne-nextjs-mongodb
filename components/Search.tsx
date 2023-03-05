const Search = ({ stocks, query, setQuery, handleFilter, filter }: any) => {
  console.log(stocks);

  return (
    <div className="container mt-4 text-black">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <div className="form-group">
              <label htmlFor="search-input">Søk:</label>
              <div className="input-group">
                <input type="text" className="form-control" id="search-input" placeholder="Aksje navn eller symbol.." value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
            </div>
            <div className="form-group d-md-flex justify-content-between align-items-center">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="toggle-switch" checked={filter} onChange={handleFilter} />
                <label className="form-check-label" htmlFor="toggle-switch">
                  Vis kun aksjer med utbytte dato
                </label>
              </div>
              
              <div className="d-md-block">
                <span className="d-none d-md-inline-block">Sist oppdatert:</span>
                <span className="d-md-none">Sist oppdatert: {new Date(stocks[0].stats[6].date).toLocaleString('en-GB')}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
