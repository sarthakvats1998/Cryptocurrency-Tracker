import React from "react";
import { useLocation } from "react-router-dom";
import CoinGraph from "../components/CoinGraph";
import CoinTweets from "../components/CoinTweets";
import CoinInfo from "../components/CoinInfo";
import CoinNews from "../components/CoinNews";

const CoinDetails = () =>{
    const location = useLocation();
    const coin = location.state; 
    
    return(
        <div style={{display:'flex', width: '100%'}}>
            <div style={{ flex: 2 }}>
                <CoinInfo data={coin} />
            </div>
            <div style={{ flex: 5, overflow: 'auto' }}>
                <CoinGraph data={coin} />
                <CoinNews data={coin}/>
            </div>
            <div style={{ flex: 2 }}>
                <CoinTweets data={coin} />
            </div>
        </div>
    );
}

export default CoinDetails;