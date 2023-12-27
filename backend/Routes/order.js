const express = require('express')
const router = express.Router()
const Order = require('../Models/Order')
const User = require('../Models/User')



router.post("/order", async (req, res) => {
    try {
        const { userID, stockName, stockSymbol, quantity, price, status } = req.body;

       
        if (!stockName || !stockSymbol || !quantity || !price || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email: userID });

        if (user) {
           
            const alreadyStock = await Order.findOne({ symbol: stockSymbol });
            
            if(alreadyStock){

                alreadyStock.price = (qty*alreadyStock.price + quantity*price)/(qty + quantity);
                alreadyStock.qty += quantity;
                
                await alreadyStock.save();
            }


            else{
                const newOrder = new Order({
                    user,
                    stock :stockName,
                    symbol : stockSymbol,
                    qty : quantity,
                    price,
                    status 
                });
    
                
                await newOrder.save();

            }

         

            
            res.status(201).json({ message: 'Order placed successfully' });
        } else {
            
            throw new Error('User not found');
        }
    } catch (error) {
        
        console.error('Error placing the order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/sell/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
     
      await Order.findByIdAndRemove(orderId);
  
      res.json({ message: 'Sell successful', removedOrder: order });
    } catch (error) {
      console.error('Error selling:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;