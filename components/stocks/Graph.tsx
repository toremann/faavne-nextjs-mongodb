import { useState, useEffect } from "react";
import { recalculateRating } from "../../utils/rating";
import LineChart from "../Linechart";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

export const Graph = ({ stock }: any) => {  
    const [activeIndex, setActiveIndex] = useState(0);
    const [ratingData, setChartData] = useState({
      labels: stock.stats.slice(-7).map((stats: { date: Date }) => new Date(stats.date).toLocaleTimeString('en-GB')),
  
      datasets: [
        {
          label: 'Rating',
          data: stock.stats.slice(-7).map((stats: { rating: number }) => recalculateRating(stats.rating)),
          backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#f0331a', '#f3ba2f', '#2a71d0'],
          borderColor: 'black',
          borderWidth: 2,
          lineTension: 0.2,
        },
      ],
    });  

    useEffect(() => {
      if (stock) {
        const labels = stock.stats.slice(-7).map((stats: { date: Date }) => new Date(stats.date).toLocaleTimeString('en-GB'));
        const data = activeIndex === 0
          ? stock.stats.slice(-7).map((stats: { rating: number }) => recalculateRating(stats.rating))
          : stock.stats.slice(-7).map((stats: { price: number }) => Number(stats.price).toFixed(2));
  
        setChartData({
          ...ratingData,
          labels,
          datasets: [
            {
              ...ratingData.datasets[0],
              data,
            },
          ],
        });
      }
    }, [stock, activeIndex]); 
  
    const handleButtonClick = (value: number) => {
      setActiveIndex(value);
    };

    const lastUpdate = stock.stats.length

    const lastObject = stock.stats[lastUpdate -1].date
  
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
          <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div className="carousel-inner">
              <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                <LineChart chartData={ratingData} lastUpdate={lastObject} />
              </div>
              <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                <LineChart chartData={ratingData} lastUpdate={lastObject} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };