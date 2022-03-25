import React, { useState } from 'react';
import millify from 'millify';
import { Link, useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import {
  useGetCryptosInfoQuery,
  useGetCryptosHistoryQuery
} from '../services/cryptoApi';

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

import LineChart from './LineChart';

export default function CryptoInfo() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptosInfoQuery(coinId);
  const { data: coinHistory, isFetching: isGraphFetching } =
    useGetCryptosHistoryQuery({
      coinId,
      timePeriod
    });

  if (isFetching) {
    return (
      <p className="font-bold text-4xl text-center h-screen flex justify-center items-center ">
        Loading...
      </p>
    );
  }

  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${
        cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])
      }`,
      icon: <ThunderboltOutlined />
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />
    }
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />
    }
  ];

  return (
    <div>
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center underline">
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
          </h1>
          <p className="text-center m-4">
            {cryptoDetails?.name} live price in US Dollar (USD). View value
            statistics, market cap and supply.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <select
            className="select select-bordered select-lg w-full max-w-xs  m-auto"
            placeholder="Select Time Period"
            defaultValue={timePeriod}
            onChange={e => {
              setTimePeriod(e.target.value);
            }}
          >
            {time.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {coinHistory && (
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="coin-value-stats">
            <div className="coin-value-heading">
              <h3 className="text-xl font-bold text-center m-6">
                {cryptoDetails?.name} Value Statistics
              </h3>
              <p className="text-center m-4">
                An overview showing the stats of {cryptoDetails?.name}
              </p>
            </div>
            {stats.map(({ icon, title, value }) => (
              <div className="card-body items-center text-center">
                <div className="grid grid-cols-2 gap-6 items-center shadow-lg hover:ease-in duration-300 hover:shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 glass rounded-xl hover:text-white">
                  <div className="flex justify-center items-center ">
                    {icon}
                    <p className="ml-4">{title}</p>
                  </div>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="other-stats">
            <div className="coin-value-heading">
              <h3 className="text-xl font-bold text-center m-6">
                Other Statistics
              </h3>
              <p className="text-center m-4">
                An overview showing the stats of all cryptocurrencies
              </p>
            </div>
            {genericStats.map(({ icon, title, value }) => (
              <div className="card-body items-center text-center">
                <div className="grid grid-cols-2 gap-6 items-center shadow-lg hover:ease-in duration-300 hover:shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 glass rounded-xl hover:text-white">
                  <div className="flex justify-center items-center">
                    {icon}
                    <p className="ml-4">{title}</p>
                  </div>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="coin-desc glass   ">
            <h3 className="text-2xl font-bold  ">
              What is {cryptoDetails.name}?
            </h3>
            <div className="text-[#270d1a]   font-semibold ">
              {HTMLReactParser(cryptoDetails.description)}
            </div>
            <div className="coin-links text-center">
              <h3 className="coin-details-heading ">
                {cryptoDetails.name} Links
              </h3>
              {cryptoDetails.links?.map(link => (
                <div
                  className="coin-link grid grid-cols-2 items-center"
                  key={link.name}
                >
                  <h3 className="link-name">{link.type}</h3>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
