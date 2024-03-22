import React, { useEffect, useState, img } from 'react';
import CryptTable from '../components/CryptTable';
import Cards from '../components/Cards';

const CryptoDashboard = () =>{

  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    const coinsMarket = async() =>{
        try{
            const data = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en'
            )

            const result = await data.json();
            //console.log(result)
            setSampleData(result);   
        }
        catch(error){
            console.log("Cant get data from the API",error.message);
        }
        
    };

    const interval = setInterval(() => {
        coinsMarket();
    }, 1000000);
    coinsMarket();
    

}, []);

    if(sampleData.length == 0){
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {/* Replace 'Loading' with a loading circle or spinner */}
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

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

export default CryptoDashboard;