import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Navbar,
  Homepage,
  CryptoInfo,
  News,
  Cryptocurrencies
} from './components';

function App() {
  return (
    <Router>
      <div className="app ">
        <div>
          <Navbar />
        </div>
        <div className="main">
          <section>
            <div className="routes pb-10">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route path="/crypto/:coinId" element={<CryptoInfo />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </div>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
