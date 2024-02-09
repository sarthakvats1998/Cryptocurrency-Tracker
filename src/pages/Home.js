import React from 'react';
import CryptTable from '../components/CryptTable';
import Cards from '../components/Cards';
import TopNavbar from '../components/TopNavbar';

const CryptoDashboard = () =>{
    return(
      <div>
          <div className='container'>
            <div style={{marginTop: '50px'}}>
              <Cards data={sampleData}/>
            </div>
            <div style={{marginTop: '60px'}}>
              <CryptTable data={sampleData}/>
            </div>
          </div>
      </div>
    );
}

const sampleData = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 41145,
      price_change_percentage_1h_in_currency: 1.5,
      price_change_percentage_24h_in_currency: -2.7,
      price_change_percentage_7d_in_currency: 5.2,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      market_cap: 800000000000,
      circulating_supply: 18500000,
      total_supply: 21000000,
      sparkline_in_7d: {
        price: [40000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000]
      }
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 2500,
      price_change_percentage_1h_in_currency: -0.5,
      price_change_percentage_24h_in_currency: 1.8,
      price_change_percentage_7d_in_currency: -8.9,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      market_cap: 300000000000,
      circulating_supply: 116000000,
      total_supply: 120000000,
      sparkline_in_7d: {
        price: [2400, 2450, 2500, 2550, 2600, 2550, 2600, 2650, 2700, 2750, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000]
      }
    },
    {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 2500,
        price_change_percentage_1h_in_currency: -0.5,
        price_change_percentage_24h_in_currency: 1.8,
        price_change_percentage_7d_in_currency: -8.9,
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        market_cap: 300000000000,
        circulating_supply: 116000000,
        total_supply: 120000000,
        sparkline_in_7d: {
          price: [2400, 2450, 2500, 2550, 2600, 2550, 2600, 2650, 2700, 2750, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000, 41000, 42000, 43000, 42000, 43000, 44000, 45000, 46000, 47000]
        }
      },
  ];

export default CryptoDashboard;