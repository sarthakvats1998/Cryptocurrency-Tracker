import React, { useEffect, useState, img } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useNavigate } from "react-router-dom";
import '../Style/CryptTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretDown, faCaretUp);

const CryptTable = (props) => {

    console.log("this is props", props);
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate();
    const handleOnClick = (coin) =>{
        navigate(`/details/${coin.id}`, { state: coin });
    }
    /*
    useEffect(() => {
        const coinsMarket = async() =>{
            try{
                const data = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en'
                )

                const result = await data.json();
                //console.log(result)
                setAllData(result);   
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

    useEffect(() => {
        console.log('allData:', allData);
    }, [allData]);
    */

    let counter = 0;

    return(
        <div>
            <table className="table table-hover border-top">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">1h %</th>
                <th scope="col">24h %</th>
                <th scope="col">7d %</th>
                <th scope="col">Market Cap</th>
                <th scope="col">Circulating Supply</th>
                <th scope="col">Trend (7d)</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(coin =>

                    <tr key={coin.id} onClick={() => handleOnClick(coin)}>
                        <th scope="row" className='table-font'><div style={{marginTop:'15px'}}>{++counter}</div></th>

                        <td><div style={{marginTop:'5px'}}><img src ={coin.image} style={{height: 25, width: 25}}/><span className='table-font' style={{marginLeft: '4px'}}>{coin.name}</span>
                            <div style={{color:'grey', marginLeft: '14px'}}>{(coin.symbol).toUpperCase()}</div></div></td>

                        <td className='table-font'><div style={{marginTop:'15px'}}>${coin.current_price.toLocaleString("en-US")}</div></td>

                        <td><div className={coin.price_change_percentage_1h_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} style={{marginTop:'15px'}}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_1h_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_1h_in_currency)}} />
                            <span style={{marginLeft:'5px'}}>{coin.price_change_percentage_1h_in_currency.toFixed(2)}</span></div>
                        </td>

                        <td><div className={coin.price_change_percentage_24h_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} style={{marginTop:'15px'}}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_24h_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_24h_in_currency)}} />
                            <span style={{marginLeft:'5px'}}>{coin.price_change_percentage_24h_in_currency.toFixed(2)}</span></div></td>

                        <td><div className={coin.price_change_percentage_7d_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} style={{marginTop:'15px'}}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_7d_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_7d_in_currency)}} />
                            <span style={{marginLeft:'5px'}}>{coin.price_change_percentage_7d_in_currency.toFixed(2)}</span></div></td>

                        <td className='table-font'><div style={{marginTop:'15px'}}>${coin.market_cap.toLocaleString("en-US")}</div></td>

                        <td><div className='table-font' style={{marginTop:'5px'}}>{coin.circulating_supply.toLocaleString("en-US")}</div><span style={{color:'grey'}}>{coin.total_supply.toFixed(2)}</span></td>

                        <td>
                            <Sparklines data={coin.sparkline_in_7d.price} limit={100} width={300} height={150} margin={5}>  
                                <SparklinesLine color={coin.price_change_percentage_7d_in_currency >= 0 ? '#6cbb3c' : '#d92721'} />
                            </Sparklines>
                        </td>
                        
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    );
}

function arrow_color(n){
    return n >= 0?'green':'red';
};

export default CryptTable;