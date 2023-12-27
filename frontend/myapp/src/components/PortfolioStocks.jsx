import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
function PortfolioCard() {

  const [portfolioData, setPortfolioData] = useState([]);
  const [currPrice, setcurrPrice] = useState(0);


  const getData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/portfolio');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPortfolioData(data);
      console.log(portfolioData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCurrentPrice = async (stockSymbol) => {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cm5subpr01qjc6l4o11gcm5subpr01qjc6l4o120`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data['c'];
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };
  const getProfit = async (price, currPrice, qty) => {
    return ((currPrice - price) * qty);
  }


  const getCurrentPriceAndProfit = async (symbol, price, qty) => {
    try {

      const currentPrice = await getCurrentPrice(symbol);
      const profit = await getProfit(price, currentPrice, qty);

      return { currentPrice, profit };
    } catch (error) {
      console.error('Error fetching current price or profit:', error);
      return { currentPrice: 'N/A', profit: 'N/A' };
    }
  };


  const handleSell = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/sell/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sell');
      }

      // Refresh the data after selling
      getData();
    } catch (error) {
      console.error('Error selling:', error);
    }
  };




  
  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Stock</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Date</th>
            <th scope="col">Profit</th>

          </tr>
        </thead>
        <tbody>
          {portfolioData.length > 0 ? (
            portfolioData.map((e, index) => {
              // const { currentPrice, profit } =  getCurrentPriceAndProfit(e.symbol, e.price, e.qty);

              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{e.stock}</td>
                  <td>{e.qty}</td>
                  <td>{e.price}</td>
                  <td>{getCurrentPriceAndProfit(e.symbol, e.price, e.qty).currentPrice}</td>
                  <td>{"12/12/12"}</td>
                  <td>{getCurrentPriceAndProfit(e.symbol, e.price, e.qty).profit}</td>
                  <button className='btn btn-danger m-2' onClick={handleSell(e._id)}> Sell </button>
                  <Link className='btn btn-success m-2' to='/order' > Buy More </Link>
                </tr>

              );
            })
          ) : (
            <tr>
              <td colSpan="7">No data available, It will be updated when market closes.</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>

  )
}

export default PortfolioCard