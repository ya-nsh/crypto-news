import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ title }) {
  return (
    <nav className="navbar mb-12 shadow-lg bg-slate-800 text-gray-50">
      <div className="container mx-auto flex">
        <div className="flex px-2 mx-2 align-middle items-center">
          <div>
            <Link to="/" className="text-lg font-bold">
              Crypto News
            </Link>
          </div>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded btn">
              Home
            </Link>
            <Link to="/news" className="btn btn-ghost btn-sm rounded btn">
              News
            </Link>
            <Link to="/" className="btn btn-ghost btn-sm rounded btn">
              Crypto
            </Link>
            <Link to="/" className="btn btn-ghost btn-sm rounded btn">
              Exchanges
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
