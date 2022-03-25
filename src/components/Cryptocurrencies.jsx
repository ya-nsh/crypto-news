import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredCoins = cryptosList?.data?.coins.filter(
      coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredCoins);
  }, [cryptosList, searchTerm]);

  if (isFetching)
    return (
      <p className="font-bold text-4xl text-center h-screen flex justify-center items-center">
        Loading...
      </p>
    );

  return (
    <>
      {!simplified && (
        <div className="flex justify-center ">
          <input
            placeholder="Search for Cryptocurrency"
            onChange={e => setSearchTerm(e.target.value)}
            className="input w-full max-w-xs border-2 border-black"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-3  xl:grid-cols-4 xl:gap-4 m-auto  mt-10">
        {cryptos?.map(currency => (
          <div key={currency.uuid} className="m-10 outline-4">
            <Link to={`/crypto/${currency.uuid}`}>
              <div className="flex justify-center items-center">
                <div
                  className="card shadow-lg  hover:shadow-2xl hover:bg-gradient-to-r hover:ease-in duration-300 hover:bg-white     
              h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100"
                >
                  <figure className="px-10 pt-10 ">
                    <img
                      src={currency.iconUrl}
                      alt={currency.name}
                      className="rounded-xl"
                      width="100"
                    />
                  </figure>

                  <div className="card-body items-center text-center">
                    <h2 className="card-title">
                      {currency.rank}. {currency.name}
                    </h2>
                    <p> Price: {millify(currency.price)}$</p>
                    <p> Market Cap: {millify(currency.marketCap)}</p>
                    <p> Daily Change: {millify(currency.change)}%</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

// Background Gradient: bg-gradient-to-r from-rose-400 to-orange-300
