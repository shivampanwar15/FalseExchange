// src/components/Orders.js
import React from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  // Fetch orders data from the server or state
  const orders = [
    { id: 1, symbol: 'AAPL', orderType: 'buy', quantity: 10, status: 'Pending' },
    { id: 2, symbol: 'GOOGL', orderType: 'sell', quantity: 5, status: 'Executed' },
  ];

  return (
    <div className="orders">
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {`Symbol: ${order.symbol}, Type: ${order.orderType}, Quantity: ${order.quantity}, Status: ${order.status}`}
          </li>
        ))}
      </ul>
      <p>
        <Link to="/order-form">Place a new order</Link> | <Link to="/portfolio">View Portfolio</Link>
      </p>
    </div>
  );
};

export default Orders;
