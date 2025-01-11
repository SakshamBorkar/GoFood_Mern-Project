const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const ConnectToMongo = require("./db")
ConnectToMongo();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's URL
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/api', require('./Routes/Createuser'));

app.use('/api', require('./Routes/OrderData'));

app.use('/api', require('./Routes/DisplayData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})