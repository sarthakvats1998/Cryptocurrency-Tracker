import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

function CoinNews(props) {
    const coin = props.data;

    const newsAPIUrl = `https://newsapi.org/v2/everything?q=${coin.name}&apiKey=1abd17e3aaa6425095636d73a2116d3d&language=en&pageSize=10&sortBy=publishedAt`;

    const [newsData, setNewsData] = useState([]);
    const [newsData2, setNewsData2] = useState([]);

    const [showButton, setShowButton] = useState(true);

    useEffect(()=>{
        const getNews = async() =>{
            try{
            const data = await fetch(newsAPIUrl);
            const news = await data.json();
            console.log(news);
            setNewsData(news.articles);
            }catch(e){
                console.log(e.message);
            }
        };

        getNews();

    },[]);

    const onMoreClick=async()=>{
        const data = await fetch(`https://newsapi.org/v2/everything?q=${coin.name}&apiKey=1abd17e3aaa6425095636d73a2116d3d&language=en&pageSize=10&page=2&sortBy=publishedAt`);
        const result = await data.json();
        setNewsData2(result.articles);
        setShowButton(false);
    };

    const hoursAgoNews=(publishedAt)=>{
        const publishedDate = new Date(publishedAt);
        const currentDate = new Date();
        
        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - publishedDate;
        
        // Convert the time difference to hours and round the result
        const hoursAgo = Math.round(timeDifference / (1000 * 60 * 60));
        
        return hoursAgo;
    }

    const openNews=(url)=>{
        window.open(url, '_blank');
    }

    newsData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));


    return (
        <div style={{margin: '40px'}}>
            <h1>{coin.name} News</h1>
                {newsData.map((news, index) => (
                    <div key={index} className='d-flex' onClick={() => openNews(news.url)} style={{marginTop:'50px'}}>
                    <p style={{ color: 'grey', fontSize:12 }}>
                        {hoursAgoNews(news.publishedAt)} Hrs Ago
                    </p>
                    <div>
                        <h5 className='fw-bold' style={{marginLeft:'20px'}}>{news.title}</h5>
                        <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, marginLeft:'20px' }}>
                            {news.content}
                        </p>
                        <p style={{ color: 'grey', marginLeft:'20px' }}>{news.source.name}</p>
                    </div>
                    <div style={{ width: '400px', height: '120px' ,overflow: 'hidden', borderRadius: '5%', marginLeft:'30px' }}>
                        <img
                            src={news.urlToImage}
                            alt='Click to read!'
                            style={{ width: '100%', height: '100%' }}
                        />
                        </div>
                    </div>
                ))}
                {newsData2.map((news, index) => (
                    <div key={index} className='d-flex' onClick={() => openNews(news.url)} style={{marginTop:'50px'}}>
                    <p style={{ color: 'grey', fontSize:12 }}>
                        {hoursAgoNews(news.publishedAt)} Hrs Ago
                    </p>
                    <div>
                        <h5 className='fw-bold' style={{marginLeft:'20px'}}>{news.title}</h5>
                        <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, marginLeft:'20px' }}>
                            {news.content}
                        </p>
                        <p style={{ color: 'grey', marginLeft:'20px' }}>{news.source.name}</p>
                    </div>
                    <div style={{ width: '400px', height: '120px' ,overflow: 'hidden', borderRadius: '5%', marginLeft:'30px' }}>
                        <img
                            src={news.urlToImage}
                            alt='Click to read!'
                            style={{ width: '100%', height: '100%' }}
                        />
                        </div>
                    </div>
                ))}
                <div className="text-center" style={{margin: '40px'}}>
                {showButton && <Button className='btn btn-lg btn-light' onClick={onMoreClick}>See More</Button>}
                </div>
        </div>
    );
}

export default CoinNews;