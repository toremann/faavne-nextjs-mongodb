import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import Stocks from '../components/Stocks';
import { Stock } from '../interfaces/stocks';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

export default function Main({ stocks, serverDate }: { stocks: Stock[]; serverDate: Date }) {
  const [items, setItems] = useState<Stock[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(false);

  const handleFilter = () => setFilter(!filter);

  useEffect(() => {
    setIsLoaded(false);
    setItems(stocks);
    setIsLoaded(true);
  }, [stocks]);

  const searchStocks = items
    .filter((stock) => stock.instrument_info.symbol.toLowerCase().includes(query.toLowerCase()) || stock.instrument_info.name.toLowerCase().includes(query.toLowerCase()))
    .filter(
      (stock) =>
        !filter ||
        ((stock.instrument_info.symbol.toLowerCase().includes(query.toLowerCase()) || stock.instrument_info.name.toLowerCase().includes(query.toLowerCase())) &&
          stock.company_info.hasOwnProperty('dividend_date'))
    );

  return (
    <>
      <div className="container mt-3">
        <Head>
          <title>Faavne | Norske utbytte aksjer - rangert!</title>
          <meta name="description" content="Finn de beste utbytte aksjene i norge, rangert daglig." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-md-start text-center">Faavne</h1>
            <p className="lead d-none d-md-block">
              Utbytte aksjer er aksjer som betaler ut en del av overskuddet til aksjonærene som utbytte. De kan gi en fast inntekt for investorer og kan også ses på som et tegn på et selskaps
              økonomiske helse.
            </p>
          </div>
        </div>

        {isLoaded ? <Stocks stocks={searchStocks} query={query} setQuery={setQuery} serverDate={serverDate} filter={filter} handleFilter={handleFilter} /> : <Loading />}
        
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db('faavne');

    const stocks = await db.collection('stocks')
    .find({'stats.4': { $exists: true }})
    .sort({ 'stats.4.rating': -1 }) 
    .toArray();

    return {
      props: {
        stocks: JSON.parse(JSON.stringify(stocks)),
        serverDate: Date.now(),
      },
    };
  } catch (e) {
    console.error(e);
  }
}
