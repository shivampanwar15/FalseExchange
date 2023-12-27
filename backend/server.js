const express = require('express');
const cors = require('cors');




const app = express();
const PORT = 3000;

const connectToMongo = require('./db')
connectToMongo();

app.use(express.json())

app.use((req, res , next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


app.use(cors());
app.use('/api' , require("./Routes/homescreen"))
app.use('/api' , require("./Routes/createuser"))
app.use('/api' , require("./Routes/order"))
app.use('/api' , require("./Routes/portfolio"))
// app.use('/api' , require("./Routes/orders/buymore/:orderId"))
// app.use('/api' , require("./Routes/orders/sell/:orderId"))






app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});