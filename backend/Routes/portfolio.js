const express = require('express')
const router = express.Router()
const Order = require('../Models/Order')


router.get('/portfolio', async (req, res) => {

    const userId = req.body.email;
    const data = await Order.find({ email: userId });
    if(data){
        
        res.json(data);

    }else{
        throw new  Error("Unable to fetch the data")
    }

    });
  
  module.exports = router;