import React from 'react';

function AboutUs(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <div style={{ backgroundColor: 'black', flex: 1 }}>
                {/* No content needed for the black side */}
            </div>
            <div style={{ flex: 1, paddingLeft: '50px', paddingRight:'50px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '60vh' }}>
                <h1 style={{paddingBottom:'20px'}}>About Us</h1>
                <div style={{fontSize:16}}>
                Coin Whale is a one-stop website that offers comprehensive information and data, including prices, trade volumes, and market capitalization for various cryptocurrencies. 
                It simplifies the process of tracking different coins, allowing users to stay up-to-date with the latest developments in the cryptocurrency world.
                </div>      
            </div>
        </div>
    );
}

export default AboutUs;
