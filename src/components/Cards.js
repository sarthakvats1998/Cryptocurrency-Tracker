import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faCaretUp, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../Style/Cards.css';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { Timeline } from "react-ts-tradingview-widgets";

library.add(faCaretDown, faCaretUp, faArrowTrendUp, faArrowTrendDown);


function Cards(props) {
    const coinsTop = [...props.data];
    const coinsWorst = [...props.data];

    let topPerforming = coinsTop.sort((a, b) => {
        return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
    });

    let worstPerforming = coinsWorst.sort((b, a) => {
        return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
    });

    const navigate = useNavigate();
    const handleOnClick = (coin) =>{
        navigate(`/details/${coin.id}`, { state: coin });
    }

    let topThree = topPerforming.slice(0, 3);
    let bottomThree = worstPerforming.slice(0, 3);
    
    const [newsData1, setNewsData1] = useState([]);
    const [newsData2, setNewsData2] = useState([]);

    useEffect(()=>{
        const getNews = async() =>{
            try{
            const data1 = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=1abd17e3aaa6425095636d73a2116d3d&q=coin&pageSize=1&page=1&category=business');
            const news1 = await data1.json();
            setNewsData1(news1.articles);
            const data2 = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=1abd17e3aaa6425095636d73a2116d3d&q=coin&pageSize=1&page=2&category=business');
            const news2 = await data2.json();
            setNewsData2(news2.articles);
            }catch(e){
                console.log(e.message);
            }
        };

        getNews();

    },[]);

    const openNews=(url)=>{
        window.open(url, '_blank');
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div id="trendingCarousel" className="carousel slide rounded" data-bs-ride="carousel" style={{width: 410, height: 190, boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)'}}>
                <ol className="carousel-indicators" style={{fontSize: 0}}>
                    <li data-bs-target="#trendingCarousel" data-bs-slide-to="0" className="active" style={{backgroundColor:'#23aee5'}}></li>
                    <li data-bs-target="#trendingCarousel" data-bs-slide-to="1" style={{backgroundColor:'#23aee5'}}></li>
                </ol>
                <div className="carousel-inner">
                    <div style={{padding: '10px', marginLeft: '10px'}}>
                    <div className="carousel-item active">
                        <h5><FontAwesomeIcon icon={faArrowTrendUp} bounce style={{color: "#6cbb3c",}}/><span style={{marginLeft:'10px', fontWeight:'bold'}}>Trending Coins</span></h5>
                        <ol>
                        {topThree.map(coin => <li key={coin.id} onClick={() => handleOnClick(coin)}>
                            <div style={{display:'flex', marginTop:'15px'}}>
                            <div style={{width: '50%'}}><img src ={coin.image} style={{height: 20, width: 20}}/><span className='table-font' style={{marginLeft: '4px', fontSize: 15, marginTop: '5px'}}>{coin.name}</span>
                            <span style={{color:'grey', marginLeft: '14px'}}>{(coin.symbol).toUpperCase()}</span></div>
                            <span className={coin.price_change_percentage_24h_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} style={{textAlign:'right', width:'50%', marginRight:'10%'}}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_24h_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_24h_in_currency)}} />
                            <span style={{marginLeft:'4px'}}>{coin.price_change_percentage_24h_in_currency.toFixed(2)}</span></span></div>
                        </li>)}
                        </ol>
                    </div>
                    <div className="carousel-item">
                    <h5><FontAwesomeIcon icon={faArrowTrendDown} bounce style={{color: "#d92721",}}/><span style={{marginLeft:'10px', fontWeight:'bold'}}>Worst Performing</span></h5>
                        <ol>
                        {bottomThree.map(coin => <li key={coin.id} onClick={() => handleOnClick(coin)}>
                            <div style={{display:'flex', marginTop:'15px'}}>
                            <div style={{width: '50%'}}><img src ={coin.image} style={{height: 20, width: 20}}/><span className='table-font' style={{marginLeft: '4px', fontSize: 15, marginTop: '5px'}}>{coin.name}</span>
                            <span style={{color:'grey', marginLeft: '14px'}}>{(coin.symbol).toUpperCase()}</span></div>
                            <span className={coin.price_change_percentage_24h_in_currency >= 0 ? 'rate-increase' : 'rate-decrease'} style={{textAlign:'right', width:'50%', marginRight:'10%'}}>
                            <FontAwesomeIcon icon={coin.price_change_percentage_24h_in_currency >= 0? 'caret-up':'caret-down'} style={{color:arrow_color(coin.price_change_percentage_24h_in_currency)}} />
                            <span style={{marginLeft:'4px'}}>{coin.price_change_percentage_24h_in_currency.toFixed(2)}</span></span></div>
                        </li>)}
                        </ol>
                    </div>
                    </div>
                </div>
            </div>

            <div id="twitterCarousel" className="container carousel slide rounded" data-bs-ride="carousel" style={{width: 410, height: 190, boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)'}}>
                <ol className="carousel-indicators" style={{fontSize: 0}}>
                    <li data-bs-target="#twitterCarousel" data-bs-slide-to="0" className="active" style={{backgroundColor:'#23aee5'}}></li>
                    <li data-bs-target="#twitterCarousel" data-bs-slide-to="1" style={{backgroundColor:'#23aee5'}}></li>
                </ol>
                <div className="carousel-inner">
                    <div style={{padding: '10px', marginLeft: '10px'}}>
                    <div className="carousel-item active">
                    <h5><span style={{marginLeft:'10px', fontWeight:'bold'}}>Top Stories</span></h5>
                        {newsData1.map((news, index) =>
                        <div key={index} className='d-flex' onClick={() => openNews(news.url)}>
                            <div>
                                <p style={{ marginLeft: '10px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3}}>
                                    {news.title}
                                </p>
                                <p style={{ color: 'grey', marginLeft: '10px' }}>-{news.source.name}</p>
                            </div>
                            <div style={{ width: '400px', height: '100px' ,overflow: 'hidden'}}>
                                <img
                                    className='rounded'
                                    src={news.urlToImage}
                                    alt='Click to read!'
                                    style={{ width: '100%', height: '100%' }}
                                />
                                </div>
                        </div>
                        )}
                    </div>
                    <div className="carousel-item">
                    <h5><span style={{marginLeft:'10px', fontWeight:'bold'}}>Top Stories</span></h5>
                        {newsData2.map((news, index) =>
                        <div key={index} className='d-flex' onClick={() => openNews(news.url)}>
                            <div>
                                <p style={{ marginLeft: '10px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3}}>
                                    {news.title}
                                </p>
                                <p style={{ color: 'grey', marginLeft: '10px' }}>-{news.source.name}</p>
                            </div>
                            <div style={{ width: '400px', height: '100px' ,overflow: 'hidden'}}>
                                <img
                                    className='rounded'
                                    src={news.urlToImage}
                                    alt='Click to read!'
                                    style={{ width: '100%', height: '100%' }}
                                />
                                </div>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
            </div>

            <div id="articlesCarousel" className="carousel slide rounded" data-bs-ride="carousel" style={{overflow: 'hidden', width: 410, height: 190, boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)'}}>
                <TechnicalAnalysis colorTheme="light" width="100%" height="100%" isTransparent="true" symbol="BITSTAMP:BTCUSD"/>
            </div>
        </div>
    );
}

function arrow_color(n){
    return n >= 0?'green':'red';
};

export default Cards;