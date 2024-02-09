import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoDashboard from './pages/Home';
import CoinDetails from './pages/CoinDetails';
import TopNavbar from './components/TopNavbar';
import Careers from './pages/Careers';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <TopNavbar/>
      <div>
        <Routes>
          <Route path="/" element={<CryptoDashboard/>}/>
          <Route path="/details/:id" element={<CoinDetails/>}/>
          <Route path="/careers" element={<Careers/>}/>
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
