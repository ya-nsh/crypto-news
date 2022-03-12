import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';
import {
  Navbar,
  Homepage,
  Exchanges,
  CryptoInfo,
  News,
  Cryptocurrencies,
  Footer
} from './components';

function App() {
  return (
    <Router>
      <div className="app">
        <div>
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route path="/crypto/:coinId" element={<CryptoInfo />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
        </div>
        <div className="footer">{/* <Footer /> */}</div>
      </div>
    </Router>
  );
}

export default App;
