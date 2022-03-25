import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  const options2 = {
    scales: {
      yAxes: {
        scaleLabel: {
          display: true,
          fontColor: 'white',
          fontSize: 25,
          labelString: 'Faction Points'
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  };

  return (
    <>
      <div className="chart-header text-center m-6">
        <h2 className="chart-title text-2xl font-bold underline mb-6">
          {coinName} Price Chart{' '}
        </h2>
        <div className="price-container">
          <h3 className="price-change text-xl font-semibold">
            Change: {coinHistory?.data?.change}%
          </h3>
          <h3 className="price-change text-xl font-semibold">
            Current {coinName} Price: $ {currentPrice}
          </h3>
        </div>
      </div>
      <div className="w-3/5 m-auto border-2 border-black rounded-xl mb-10 mt-10 p-2">
        <Line data={data} options={options2} />
      </div>
    </>
  );
};

export default LineChart;
