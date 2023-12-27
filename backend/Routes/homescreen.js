const express = require('express');
const router = express.Router();
const axios = require('axios');




router.get('/getallstocks', async (req, res) => {
    const url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=MZR5AS87EF8P0RVN';
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'axios',
            },
        });
        
        res.json(response.data); // Send the data as a response to the client
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
});




router.get('/search', async (req, res) => {
  const { query } = req.query; 
  console.log(query);
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const url = `https://finnhub.io/api/v1/search?q=${query}&token=cm5subpr01qjc6l4o11gcm5subpr01qjc6l4o120`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'axios',
        },
      });

      res.json(response.data); // Send the data as a response to the client
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
  });

module.exports = router;



