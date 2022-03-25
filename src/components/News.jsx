import React, { useState } from 'react';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 10 : 50
  });
  const { data } = useGetCryptosQuery(100);

  const fallbackImage =
    'https://thumbs.dreamstime.com/b/world-news-flat-vector-icon-news-symbol-logo-illustration-95819924.jpg';

  if (!cryptoNews)
    return (
      <p className="font-bold text-4xl text-center h-screen flex justify-center items-center ">
        Loading...
      </p>
    );

  return (
    <div>
      {' '}
      {!simplified && (
        <div className="flex justify-center flex-col gap-6 mb-12 mt-12">
          <h2 className="text-center text-3xl text-bold">Select a Crypto</h2>
          <select
            className="select select-bordered select-lg w-full max-w-xs  m-auto"
            placeholder="Select a Crypto"
            defaultValue={newsCategory}
            onChange={e => {
              setNewsCategory(e.target.value);
            }}
          >
            <option disabled selected value="Cryptocurrency">
              Cryptocurrency
            </option>
            {data?.data?.coins.map(coin => (
              <option value={coin.name}>{coin.name}</option>
            ))}
          </select>
        </div>
      )}
      <h1 className="text-center text-4xl text-bold underline p-10 ">
        Today's Top Headlines
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-3  xl:grid-cols-3 xl:gap-4  m-10 border-2 border-black rounded-md p-8">
        {cryptoNews.value.length === 0 && (
          <div className="flex justify-center items-center">
            <p className="text-xl font-bold text-center">No News Found</p>
          </div>
        )}
        {cryptoNews?.value.map((article, i) => (
          <div key={i} className="m-10 outline-4 ">
            <div className="flex justify-center items-center h-full w-full ">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="card  shadow-lg hover:ease-in duration-300 hover:shadow-2xl hover:bg-gradient-to-r hover:bg-white   
              h-full  bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100 max-w-md"
                >
                  <figure className="px-10 pt-10 ">
                    <img
                      src={
                        article.image?.thumbnail?.contentUrl || fallbackImage
                      }
                      alt={article.title}
                      className="rounded-xl w-1/2 "
                    />
                  </figure>

                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl mb-2">{article.name}</h2>

                    <p className="text-bold text-xl mt-3 mb-3 ">
                      {article.description.length > 100
                        ? `${article.description.substring(0, 100)}...`
                        : article.description}
                    </p>
                  </div>
                  <div className="avatar flex justify-center items-center mb-5">
                    <div className="w-14 rounded-xl ml-2">
                      <img
                        src={
                          article.provider[0]?.image?.thumbnail?.contentUrl ||
                          fallbackImage
                        }
                        alt="news icon"
                        className="rounded-xl w-3/4 p-2"
                      />
                    </div>
                    <p className="m-4">{article.provider[0]?.name}</p>
                    <p className="m-3">
                      {moment(article.datePublished).startOf('ss').fromNow()}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
