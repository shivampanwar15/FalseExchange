// src/components/OrderForm.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './OrderForm.css'; // Import the CSS file

const OrderForm = () => {

  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [curPrice , setCurPrice] = useState(0.0);

  const { stockName, stockSymbol } = useParams();
  console.log(stockName);
  console.log(stockSymbol);

  const handlePlaceOrder = async () => {
    try {
      let status = 'Pending';
      if(price <= curPrice){
        status = "Successfully Executed !"
      }
      const userID = localStorage.getItem("userEmail");
      const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          stockName,
          stockSymbol,
          quantity,
          price,
          status
        }),
      });

      if (!response.ok) {
        throw new Error('Error placing the order');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };



  const getCurrentPrice = async () => {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cm5subpr01qjc6l4o11gcm5subpr01qjc6l4o120`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCurPrice(data['c']);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };
  useEffect(()=>{
    getCurrentPrice();
    // setInterval(() => {
      
    // }, 5000000);
  })



  return (
    <div>
    <Navbar></Navbar>
    <div className='container p-5'>
     
      <div className="order-form ">
        <h2 className='text-dark'>Place Order</h2>
        <h5 className='text-danger'>  {stockName || ""}</h5>
        <h4 className='text-danger'> Price:  $ {curPrice}</h4>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="number"
          placeholder="No. of shares to buy/sell"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Order Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={handlePlaceOrder}>Place Order</button>
        <p >
          <Link className='text-dark' to="/orders">View Orders</Link> | <Link className='text-dark' to="/portfolio">View Portfolio</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default OrderForm;
