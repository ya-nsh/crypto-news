import React from 'react';
import millify from 'millify';
import { Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';

import { Cryptocurrencies, News } from '../components';

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching)
    return (
      <p className="font-bold text-4xl text-center h-screen flex justify-center items-center">
        Loading...
      </p>
    );
  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-6">Crypto Stats</h1>
      {/* <hr /> */}
      <div className="p-4 grid grid-rows-5 md:grid-rows-3 lg:grid-rows-2 grid-flow-col gap-8 border-2 border-black m-4 card">
        <div className="glass p-6 card shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:ease-in duration-300 hover:bg-white">
          <h3 className="text-lg font-light text-center tracking-wide">
            Total Cryptocurrencies
          </h3>
          <p className="text-2xl font-bold text-center">
            {millify(globalStats.total)}
          </p>
        </div>
        <div className="glass p-6 card shadow-lg hover:shadow-2xl  hover:bg-gradient-to-r hover:ease-in duration-300 hover:bg-white">
          <h3 className="text-lg font-light text-center tracking-wide">
            Total Exchanges
          </h3>
          <p className="text-2xl font-bold text-center">
            {millify(globalStats.totalExchanges)}
          </p>
        </div>
        <div className="glass p-6 card shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:ease-in duration-300 hover:bg-white">
          <h3 className="text-lg font-light text-center tracking-wide">
            Total Market Cap
          </h3>
          <p className="text-2xl font-bold text-center">
            {millify(globalStats.totalMarketCap)}
          </p>
        </div>
        <div className="glass p-6 card shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:ease-in duration-300 hover:bg-white">
          <h3 className="text-lg font-light text-center tracking-wide">
            Total 24h Volume
          </h3>
          <p className="text-2xl font-bold text-center">
            {millify(globalStats.total24hVolume)}
          </p>
        </div>
        <div className="glass p-6 card shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:ease-in duration-300 hover:bg-white">
          <h3 className="text-lg font-light text-center tracking-wide">
            Total Markets
          </h3>
          <p className="text-2xl font-bold text-center">
            {millify(globalStats.totalMarkets)}
          </p>
        </div>
      </div>
      {/* <hr /> */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold text-center mb-6 p-2 m-4">
          Top Cryptocurrencies in the world
        </h2>
        <div className="p-2 m-4">
          <Link to="/cryptocurrencies" className="text-xl text-[#0066ff]">
            Show More
          </Link>
        </div>
      </div>
      <Cryptocurrencies simplified />
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold text-center mb-6 p-2 m-4">
          Latest Crypto News
        </h2>
        <div className="p-2 m-4">
          <Link to="/news" className="text-xl text-[#0066ff]">
            Show More
          </Link>
        </div>
      </div>
      <News simplified />
    </div>
  );
}
