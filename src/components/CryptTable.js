import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import '../Style/CryptTable.css'; // Linking the external CSS file

library.add(faCaretDown, faCaretUp);

const CryptTable = (props) => {
    const coinData = props.data;
    const navigate = useNavigate();
    const handleOnClick = (coin) =>{
        navigate(`/details/${coin.id}`, { state: coin });
    }

    let counter = 0;

    return(
        <div>
            <table className="table table-hover border-top">
            <thead>
                <tr className="text-right">
                <th scope="col" className="text-left">#</th>
                <th scope="col" className="text-left">Name</th>
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
                {coinData.map(coin =>
                    
                    <tr key={coin.id} onClick={() => handleOnClick(coin)} className="text-right">
                        <th scope="row" className='table-font text-left'><div className="table-margin-top">{++counter}</div></th>

                        <td className="text-left"><div className="table-margin-top-double"><img src ={coin.image} className="image-size"/><span className='table-font' style={{marginLeft: '4px'}}>{coin.name}</span>
                            <div className="symbol-color">{(coin.symbol).toUpperCase()}</div></div></td>

                        <td className='table-font'><div className="table-margin-top">${coin.current_price?.toFixed(2).toLocaleString("en-US")}</div></td>

                        <td><div className={`${coin.price_change_percentage_1h_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} table-margin-top`}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_1h_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_1h_in_currency)}} />
                            <span style={{marginLeft:'5px'}}>{coin.price_change_percentage_1h_in_currency.toFixed(2)}</span></div>
                        </td>

                        <td><div className={`${coin.price_change_percentage_24h_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} table-margin-top`}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_24h_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_24h_in_currency)}} />
                            <span style={{marginLeft:'5px'}}>{coin.price_change_percentage_24h_in_currency.toFixed(2)}</span></div></td>

                        <td><div className={`${coin.price_change_percentage_7d_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} table-margin-top`}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_7d_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_7d_in_currency)}} />
                            <span style={{marginLeft:'5px'}}>{coin.price_change_percentage_7d_in_currency.toFixed(2)}</span></div></td>

                        <td className='table-font'><div className="table-margin-top">${coin.market_cap.toLocaleString("en-US")}</div></td>
                        <td><div className='table-font table-margin-top-double'>{coin.circulating_supply.toLocaleString("en-US")}</div><span className="symbol-color">{coin.total_supply?.toFixed(2)}</span></td>

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
