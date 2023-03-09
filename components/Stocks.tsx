import { formatDistance } from 'date-fns';
import { useState } from 'react';
import Search from './Search';
import { setColor } from '../utils/setColor';
import { Stock, StocksProps } from '../interfaces/stocks';
import { recalculateRating } from '../utils/rating';
import { nb } from 'date-fns/locale';
import LineChart from './Linechart';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Accordion from 'react-bootstrap/Accordion';
import Link from 'next/link';

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

const Graph = ({ stock }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratingData, setChartData] = useState({
    labels: stock.stats.map((stats: { date: Date }) => new Date(stats.date).toLocaleTimeString('en-GB')),

    datasets: [
      {
        label: 'Rating',
        data: stock.stats.map((stats: { rating: number }) => stats.rating),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#f0331a', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 2,
        lineTension: 0.2,
      },
    ],
  });

  const [priceData, setPriceData] = useState({
    labels: stock.stats.map((stats: { date: Date }) => new Date(stats.date).toLocaleTimeString('en-GB')),

    datasets: [
      {
        label: 'Pris',
        data: stock.stats.map((stats: { price: number }) => stats.price),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#f0331a', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 2,
        lineTension: 0.2,
      },
    ],
  });

  const handleButtonClick = (value: number) => {
    setActiveIndex(value);
  };

  return (
    <div>
      <ul className="nav nav-tabs justify-content-center mb-2">
        <li className="nav-item">
          <button className={`nav-link ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleButtonClick(0)}>
            Rating
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>
            Pris
          </button>
        </li>
      </ul>

      <div>
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
              <LineChart chartData={ratingData} name={'rating'} />
            </div>
            <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
              <LineChart chartData={priceData} name={'price'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stocks = ({ stocks, query, setQuery, serverDate, filter, handleFilter }: StocksProps) => {
  return (
    <div className="mt-3 pb-2 rounded bg-secondary bg-gradient bg-opacity-25">
      <Search stocks={stocks} query={query} setQuery={setQuery} filter={filter} handleFilter={handleFilter} />
      {stocks
        .filter((stock: Stock) => stock.price_info.last.price > 0)
        .map((stock: Stock, index: number) => (
          <div key={index} className={`border border-dark rounded m-4 bg-dark bg-gradient`}>
            <Header stock={stock} />
            <Body stock={stock} />

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Utbytte</Accordion.Header>
                <Accordion.Body>
                  <Footer stock={stock} serverDate={serverDate} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Graph</Accordion.Header>
                <Accordion.Body>
                  <Graph stock={stock} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
        <div className="text-center m-2 bg-black-25">
          <Link href="https://github.com/toremann" className="link-dark" aria-label="Learn more about this project">
            <h3 className="bi bi-github" id="github-icon" />
          </Link>
        </div>
    </div>
  );
};

export default Stocks;
