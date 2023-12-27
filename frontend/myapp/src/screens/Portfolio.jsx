// src/components/Portfolio.js
import React from 'react';
import Navbar from '../components/Navbar';
import PortfolioStocks from '../components/PortfolioStocks'



const Portfolio = () => {
 
  return (
    <div>
     
      <Navbar></Navbar>
      <h2>Portfolio</h2>
      <PortfolioStocks></PortfolioStocks>
    </div>
  );
};

export default Portfolio;
