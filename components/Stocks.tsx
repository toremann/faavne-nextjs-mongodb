import { formatDistance } from 'date-fns';
import { useState } from 'react';
import Search from './Search';
import { setColor } from '../utils/setColor';
import { Stock, StocksProps } from '../interfaces/stocks';
import { recalculateRating } from '../utils/rating';
import { nb } from 'date-fns/locale';
import { Data } from '../utils/Data';
import LineChart from './Linechart';

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";


Chart.register(CategoryScale);


const Header = ({ stock }: { stock: Stock }) => {
  return (
    <div className="d-flex align-items-center justify-content-between m-4 mb-0 text-white">
      <div className="text-truncate">{stock.instrument_info.long_name}</div>
      <div className="">Rating</div>
    </div>
  );
};

const Body = ({ stock }: { stock: Stock }) => {
  // Find highest and lowest rating
  let highestRating = -Infinity;
  let lowestRating = Infinity;
  for (const stat of stock.stats) {
    if (stat.rating > highestRating) {
      highestRating = stat.rating;
    }
    if (stat.rating < lowestRating) {
      lowestRating = stat.rating;
    }
  }

  // Recalculate rating to be between 0 and 100
  const rating = recalculateRating(stock.stats[stock.stats.length - 1].rating);

  return (
    <div className="d-flex align-items-center justify-content-between m-4 mt-0 text-white">
      <div className="h1 mr-2 col-3">{stock.instrument_info.symbol}</div>
      <div className={`col-5 ${stock.price_info.diff_pct > 0 ? 'text-success' : 'text-danger'}`}>
        <p className="h6">{stock.price_info.last.price.toFixed(2)}NOK</p>
        <p className="h6">
          {stock.price_info.diff_pct}% <i className={stock.price_info.diff_pct > 0 ? 'bi bi-arrow-up-circle' : 'bi bi-arrow-down-circle'} />
        </p>
      </div>
      <div>
        <h1 className={`h1 ${setColor(rating)}`}>{rating}</h1>
      </div>
    </div>
  );
};

const Footer = ({ stock, serverDate }: { stock: Stock; serverDate: Date }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">
            Excluding dato:
            <div className="h3">
              {stock.company_info.excluding_date
                ? `${stock.company_info.excluding_date && new Date(stock.company_info.excluding_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
                    new Date(stock.company_info.excluding_date),
                    serverDate,
                    { locale: nb }
                  )}${')'}`
                : 'Ingen dato'}
            </div>
          </div>
          <div className="col-md-6">
            Utbytte dato:
            <div className="h3">
              {stock.company_info.dividend_date
                ? `${stock.company_info.dividend_date && new Date(stock.company_info.dividend_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
                    new Date(stock.company_info.dividend_date),
                    serverDate,
                    { locale: nb }
                  )}${')'}`
                : 'Ingen dato'}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4 col-md-3 text-truncate">Utbytte per aksje:</div>
          <div className="col-4 col-md-3">Yield:</div>
          <div className="col-4 col-md-3">Yield YTD:</div>
        </div>
        <div className="row">
          <div className="col-4 col-md-3 h3">{stock.key_ratios_info.dividend_per_share}</div>
          <div className="col-4 col-md-3 h3">{stock.key_ratios_info.dividend_yield}</div>
          <div className="col-4 col-md-3 h3">{stock.historical_returns_info.yield_ytd}</div>
        </div>
      </div>
    </div>
  );
};

const Graph = ({stock}: any) => {
  console.log(stock)
  const [chartData, setChartData] = useState({
    labels: stock.stats.map((stats) => new Date(stats.date).toLocaleTimeString('en-GB')),

    datasets: [
      {
        label: "Users Gained ",
        data: stock.stats.map((stats) => stats.rating),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  return(
  <div>
          <LineChart chartData={chartData} />

  </div>
  )
};

const Stocks = ({ stocks, query, setQuery, serverDate, filter, handleFilter }: StocksProps) => {
  const [isBodyExpanded, setIsBodyExpanded] = useState(stocks.map(() => false));
  const [isGraphExpanded, setIsGraphExpanded] = useState(stocks.map(() => false)); 

  const toggleBodyExpansion = (index: number) => {
    const updatedExpandedState = [...isBodyExpanded];
    updatedExpandedState[index] = !isBodyExpanded[index];
    setIsBodyExpanded(updatedExpandedState);
  };

  const toggleGraphExpansion = (index: number) => {
    const updateExpandedGraph = [...isGraphExpanded];
    updateExpandedGraph[index] = !isGraphExpanded[index]
    setIsGraphExpanded(updateExpandedGraph); 
  };

  return (
    <div className="container mt-4 rounded bg-secondary bg-gradient bg-opacity-25 p-2">
      <Search stocks={stocks} query={query} setQuery={setQuery} filter={filter} handleFilter={handleFilter} />
      {stocks
        .filter((stock: Stock) => stock.price_info.last.price > 0)
        .sort((a: Stock, b: Stock) => ((a.stats[6]?.rating ?? 0) < (b.stats[6]?.rating ?? 0) ? 1 : -1))
        .map((stock: Stock, index: number) => (
          <div key={index} className={`border border-dark rounded m-4 bg-dark bg-gradient`}>
            <Header stock={stock} />
            <Body stock={stock} />

            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" onClick={() => toggleBodyExpansion(index)}>
                    Utbytte
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${isBodyExpanded[index] ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <Footer stock={stock} serverDate={serverDate} />
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" onClick={() => toggleGraphExpansion(index)}>
                    Graph
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${isGraphExpanded[index] ? 'show' : ''}`}>
                  <div className="accordion-body">
                    
                    <Graph stock={stock}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Stocks;

