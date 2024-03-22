import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CompanyLogo from '../Assets/Logo.png';
import { TickerTape } from "react-ts-tradingview-widgets";
import { SocialIcon } from 'react-social-icons';
import { useNavigate } from 'react-router-dom';
import '../Style/TopNavbar.css'; // Import external CSS file

function TopNavbar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm=(e)=>{
    setSearchTerm(e.target.value);
  };

  const handleClick= async()=>{
    const searchApi = searchTerm.toLowerCase();
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchApi}&per_page=1&page=1&sparkline=false&locale=en`);
    const result = await data.json();
    result.map(res=>navigate(`/details/${res.id}`, {state: res}));
  };

    return (
        <div className="top-navbar"> {/* Add class name for external CSS */}
          <TickerTape colorTheme="light" displayMode="adaptive" symbols={coinSymbols}/>
            <Navbar className='border' expand="lg" style={{height: 70}}>
              <Container fluid>
                <Navbar.Brand href="/" className="navbar-brand"> {/* Add class name for external CSS */}
                  <img
                    src={CompanyLogo}
                    width="300"
                    height="60"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0 navbar-links"
                    navbarScroll
                  >
                    <Nav.Link href="/" className='text-dark'>Home</Nav.Link>
                    <NavDropdown title="Community" id="navbarScrollingDropdown" className="dropdown"> {/* Add class name for external CSS */}
                      <NavDropdown.Item href="https://x.com/Bitcoin">
                        <SocialIcon url="https://x.com/Bitcoin" style={{ height: 25, width: 25 }}/><span style={{marginLeft: '10px'}}>X</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="https://www.linkedin.com/in/sarthakvats1/">
                        <SocialIcon url="https://www.linkedin.com/in/sarthakvats1/" style={{ height: 25, width: 25 }}/><span style={{marginLeft: '10px'}}>LinkedIn</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="https://github.com/sarthakvats1998">
                        <SocialIcon url="https://github.com/sarthakvats1998" style={{ height: 25, width: 25 }}/><span style={{marginLeft: '10px'}}>GitHub</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="More" id="navbarScrollingDropdown" className="dropdown"> {/* Add class name for external CSS */}
                      <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                      <NavDropdown.Item href="/careers">
                        Careers
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action5">
                        Feedback
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex" style={{marginRight:'10px'}}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={handleSearchTerm}
                    />
                    <Button variant="outline-dark" onClick={handleClick}>Search</Button>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
    );
}

const coinSymbols = [
  {
    "proName": "BITSTAMP:BTCUSD",
    "title": "Bitcoin"
  },
  {
    "proName": "BITSTAMP:ETHUSD",
    "title": "Ethereum"
  },
  {
    "description": "Binance",
    "proName": "BINANCE:BNBUSD"
  },
  {
    "description": "Solana",
    "proName": "COINBASE:SOLUSD"
  },
  {
    "description": "Ripple",
    "proName": "BITSTAMP:XRPUSD"
  },
  {
    "description": "USDC",
    "proName": "BITSTAMP:USDCUSD"
  },
  {
    "description": "Cardano",
    "proName": "BINANCE:ADAUSD"
  },
  {
    "description": "Avalanche",
    "proName": "BITSTAMP:AVAXUSD"
  },
  {
    "description": "Dogecoin",
    "proName": "BINANCE:DOGEUSD"
  },
  {
    "description": "Tether",
    "proName": "COINBASE:USDTUSD"
  }
]

export default TopNavbar;
