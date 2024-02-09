import React, { useEffect, useRef, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import TradingViewWidget from './TradingViewWidget';

function CoinGraph(props) {
    const coin = props.data;

    const ref1D = useRef();
    const ref7D = useRef();
    const ref1M = useRef();
    const ref1Y = useRef();
    const refAll = useRef(); 

    const [timestamps1D, setTimestamps1D] = useState([]);
    const [price1D, setPrices1D] = useState([]);

    const [timestamps7D, setTimestamps7D] = useState([]);
    const [price7D, setPrices7D] = useState([]);

    const [timestamps1M, setTimestamps1M] = useState([]);
    const [price1M, setPrices1M] = useState([]);

    const [timestamps1Y, setTimestamps1Y] = useState([]);
    const [price1Y, setPrices1Y] = useState([]);

    const [timestampsAll, setTimestampsAll] = useState([]);
    const [priceAll, setPricesAll] = useState([]);

    useEffect(()=>{
        const get1DData = async()=>{
            let data1D = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`);
            let result1D = await data1D.json();
            let times = result1D.prices.map(entry => entry[0]);
            let prices = result1D.prices.map(entry => entry[1]);
            setTimestamps1D(times);
            setPrices1D(prices);
        };
        get1DData();

        const get7DData = async()=>{
            let data7D = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`);
            let result7D = await data7D.json();
            let times = result7D.prices.map(entry => entry[0]);
            let prices = result7D.prices.map(entry => entry[1]);
            setTimestamps7D(times);
            setPrices7D(prices);
        };
        get7DData();

        const get1MData = async()=>{
            let data1M = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=30&interval=daily`);
            let result1M = await data1M.json();
            let times = result1M.prices.map(entry => entry[0]);
            let prices = result1M.prices.map(entry => entry[1]);
            setTimestamps1M(times);
            setPrices1M(prices);
        };
        get1MData();

        const get1YData = async()=>{
            let data1Y = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=365`);
            let result1Y = await data1Y.json();
            let times = result1Y.prices.map(entry => entry[0]);
            let prices = result1Y.prices.map(entry => entry[1]);
            setTimestamps1Y(times);
            setPrices1Y(prices);
        };
        get1YData();

        const getAllData = async()=>{
            let dataAll = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=max`);
            let resultAll = await dataAll.json();
            let times = resultAll.prices.map(entry => entry[0]);
            let prices = resultAll.prices.map(entry => entry[1]);
            setTimestampsAll(times);
            setPricesAll(prices);
        };
        getAllData();
        
    },[]
    );

    const get1DGraph =()=>{
        const dateObjects = timestamps1D.map(timestamp => new Date(parseInt(timestamp)));

        const formattedTimes = dateObjects.map(date => {
            const hours = date.getHours() % 12 || 12;
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        });

        const data = {
            labels: formattedTimes,
            datasets: [
                {
                    label: 'Price',
                    data: price1D,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };

        const options = {
            scales: {
              x: {
                ticks: {
                  maxRotation: 0, // Set to 0 to disable rotation
                  autoSkipPadding: 20, // Adjust padding between labels
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Set to false to hide the legend
              },
            },
        };
    
        return (
            <div>
                <Line ref={ref1D} data={data} height={50} width={100} options={options}/>
            </div>
        );
    };

    const get7DGraph =()=>{
        const dateObjects = timestamps7D.map(timestamp => new Date(parseInt(timestamp)));

        const formattedTimes = dateObjects.map(date => {
        const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        return `${month} ${day}, ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        });

        const data = {
            labels: formattedTimes,
            datasets: [
                {
                    label: 'Price',
                    data: price7D,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };

        const options = {
            scales: {
              x: {
                ticks: {
                  maxRotation: 0, // Set to 0 to disable rotation
                  autoSkipPadding: 10, // Adjust padding between labels
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Set to false to hide the legend
              },
            },
        };
    
        return (
            <div>
                <Line ref={ref7D} data={data} height={50} width={100} options={options}/>
            </div>
        );
    };

    const get1MGraph =()=>{
        const dateObjects = timestamps1M.map(timestamp => new Date(parseInt(timestamp)));

        const formattedTimes = dateObjects.map(date => {
        const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
        });

        const data = {
            labels: formattedTimes,
            datasets: [
                {
                    label: 'Price',
                    data: price1M,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };

        const options = {
            scales: {
              x: {
                ticks: {
                  maxRotation: 0, // Set to 0 to disable rotation
                  autoSkipPadding: 20, // Adjust padding between labels
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Set to false to hide the legend
              },
            },
        };
    
        return (
            <div>
                <Line ref={ref1M} data={data} height={50} width={100} options={options}/>
            </div>
        );
    };

    const get1YGraph =()=>{
        const dateObjects = timestamps1Y.map(timestamp => new Date(parseInt(timestamp)));

        const formattedTimes = dateObjects.map(date => {
        const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
        });

        const data = {
            labels: formattedTimes,
            datasets: [
                {
                    label: 'Price',
                    data: price1Y,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };

        const options = {
            scales: {
              x: {
                ticks: {
                  maxRotation: 0, // Set to 0 to disable rotation
                  autoSkipPadding: 20, // Adjust padding between labels
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Set to false to hide the legend
              },
            },
        };

    
        return (
            <div style={{ overflowX: 'auto' }}>
                <Line ref={ref1Y} data={data} height={50} width={100} options={options} />
            </div>
        );
    };

    const getAllGraph =()=>{
        const dateObjects = timestampsAll.map(timestamp => new Date(parseInt(timestamp)));

        const formattedTimes = dateObjects.map(date => {
        const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name
        const year = date.getFullYear();

        return `${month}, ${year}`;
        });

        const data = {
            labels: formattedTimes,
            datasets: [
                {
                    label: 'Price',
                    data: priceAll,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
          };

          const options = {
            scales: {
              x: {
                ticks: {
                  maxRotation: 0, // Set to 0 to disable rotation
                  autoSkipPadding: 20, // Adjust padding between labels
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Set to false to hide the legend
              },
            },
          };
    
        return (
            <div style={{ overflowX: 'auto' }}>
                <Line ref={refAll} data={data} height={50} width={100} options={options} />
            </div>
        );
    };

    return (
        <div style={{margin: '40px'}}>
            <Tabs
                defaultActiveKey="1D"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="1D" title="1D">
                    {get1DGraph()}
                </Tab>
                <Tab eventKey="7D" title="7D">
                    {get7DGraph()}
                </Tab>
                <Tab eventKey="1M" title="1M">
                    {get1MGraph()}
                </Tab>
                <Tab eventKey="1Y" title="1Y">
                    {get1YGraph()}
                </Tab>
                <Tab eventKey="ALL" title="ALL">
                    {getAllGraph()}
                </Tab>
                <Tab eventKey="Trading" title="TradingView">
                    <TradingViewWidget data={(coin.symbol).toUpperCase()}/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default CoinGraph;