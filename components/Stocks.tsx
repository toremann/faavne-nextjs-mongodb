import Search from './Search';
import { Stock, StocksProps } from '../interfaces/stocks';
import Accordion from 'react-bootstrap/Accordion';
import Link from 'next/link';
import { Header } from './stocks/Header';
import { Body } from './stocks/Body';
import { Footer } from './stocks/Footer';
import { Graph } from './stocks/Graph';

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
