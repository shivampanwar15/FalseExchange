import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [dataStocks, setdataStocks] = useState({
    top_gainers: [],
    top_losers: [],
    most_actively_traded: []
  });


  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/getallstocks');
    const data = await response.json();
    setdataStocks(data);

  };

  useEffect(() => {
    fetchData();
  }, []); 
  
  return (
    <div className="home">
      <Navbar> </Navbar>
      <h1>Welcome to the Mock Exchange</h1>
      <p>Connect to the exchange and manage your orders and portfolio.</p>
      <div className="container p-4">
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
          <h2>Most Active</h2>
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Price</th>
                <th scope='col'>Change</th>
                <th scope='col'>Change %</th>
                <th scope='col'>Volume</th>
              </tr>
            </thead>
            <tbody>
              {dataStocks.most_actively_traded && dataStocks.most_actively_traded.length > 0 ? (
                dataStocks.most_actively_traded.slice(0, 5).map((stock, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.change_amount}</td>
                    <td>{stock.change_percentage}</td>
                    <td>{stock.volume}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available, It will be updated when market closes.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
          <h2>Top Gainers</h2>
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Price</th>
                <th scope='col'>Change</th>
                <th scope='col'>Change %</th>
                <th scope='col'>Volume</th>
              </tr>
            </thead>
            <tbody>
              {dataStocks.top_gainers && dataStocks.top_gainers.length > 0 ? (
                dataStocks.top_gainers.slice(0, 5).map((stock, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.change_amount}</td>
                    <td>{stock.change_percentage}</td>
                    <td>{stock.volume}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available, It will be updated when market closes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
          <h2>Top Losers</h2>
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Price</th>
                <th scope='col'>Change</th>
                <th scope='col'>Change %</th>
                <th scope='col'>Volume</th>
              </tr>
            </thead>
            <tbody>
              {dataStocks.top_losers && dataStocks.top_losers.length > 0 ? (
                dataStocks.top_losers.slice(0, 5).map((stock, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.change_amount}</td>
                    <td>{stock.change_percentage}</td>
                    <td>{stock.volume}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available, It will be updated when market closes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
