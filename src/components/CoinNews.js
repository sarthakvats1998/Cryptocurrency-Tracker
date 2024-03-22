import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import '../Style/CoinNews.css';

function CoinNews(props) {
    const coin = props.data;

    const newsAPIUrl = `https://newsapi.org/v2/everything?q=${coin.name}&apiKey=1abd17e3aaa6425095636d73a2116d3d&language=en&pageSize=10&sortBy=publishedAt`;

    const [newsData, setNewsData] = useState([]);
    const [newsData2, setNewsData2] = useState([]);

    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await fetch(newsAPIUrl);
                const news = await data.json();
                console.log(news);
                setNewsData(news.articles);
            } catch (e) {
                console.log(e.message);
            }
        };

        getNews();

    }, []);

    const onMoreClick = async () => {
        const data = await fetch(`https://newsapi.org/v2/everything?q=${coin.name}&apiKey=1abd17e3aaa6425095636d73a2116d3d&language=en&pageSize=10&page=2&sortBy=publishedAt`);
        const result = await data.json();
        setNewsData2(result.articles);
        setShowButton(false);
    };

    const hoursAgoNews = (publishedAt) => {
        const publishedDate = new Date(publishedAt);
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - publishedDate;

        // Convert the time difference to hours and round the result
        const hoursAgo = Math.round(timeDifference / (1000 * 60 * 60));

        return hoursAgo;
    }

    const openNews = (url) => {
        window.open(url, '_blank');
    }

    newsData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return (
        <div className="coin-news-container">
            <h1>{coin.name} News</h1>
            {newsData.map((news, index) => (
                <div key={index} className='news-item' onClick={() => openNews(news.url)}>
                    <p className='news-timestamp'>{hoursAgoNews(news.publishedAt)} Hrs Ago</p>
                    <div className='news-content'>
                        <h5 className='news-title'>{news.title}</h5>
                        <p className='news-description'>{news.content}</p>
                        <p className='news-source'>{news.source.name}</p>
                    </div>
                    <div className='news-image-container'>
                        <img src={news.urlToImage} alt='Click to read!' className='news-image' />
                    </div>
                </div>
            ))}
            {newsData2.map((news, index) => (
                <div key={index} className='news-item' onClick={() => openNews(news.url)}>
                    <p className='news-timestamp'>{hoursAgoNews(news.publishedAt)} Hrs Ago</p>
                    <div className='news-content'>
                        <h5 className='news-title'>{news.title}</h5>
                        <p className='news-description'>{news.content}</p>
                        <p className='news-source'>{news.source.name}</p>
                    </div>
                    <div className='news-image-container'>
                        <img src={news.urlToImage} alt='Click to read!' className='news-image' />
                    </div>
                </div>
            ))}
            <div className="text-center">
                {showButton && <Button className='btn btn-lg btn-light' onClick={onMoreClick}>See More</Button>}
            </div>
        </div>
    );
}

export default CoinNews;
