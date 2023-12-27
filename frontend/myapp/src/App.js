
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import OrderForm from './screens/OrderForm';
import Orders from './screens/Order';
import Portfolio from './screens/Portfolio';
import Signup from './screens/Signup';
import Stocks from './screens/Stocks';

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
        <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path= "/orders" element={ <Orders />}/>
            <Route exact path= "/stocks" element={ <Stocks />}/>
            <Route exact path= "/portfolio" element={ <Portfolio />}/>
            <Route exact path= "/orderform/:stockName/:stockSymbol" element={ <OrderForm />}/>
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;
