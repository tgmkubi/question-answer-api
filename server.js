const express = require('express');
require('dotenv').config({path: './config/env/config.env'});
const app = express();
const PORT = process.env.PORT;

// MongoDb Connection
const connectDatabase = require('./helpers/database/connectDatabase');
connectDatabase();

const customErrorHandler = require('./middlewares/errors/customErrorHandler');


//To get req.body parameters from user
app.use(express.json());
//Routers Middleware
const routers = require('./routers/index');
app.use('/api', routers);

// Express Default Error Handler
app.use(customErrorHandler);


app.listen(PORT, () => {
  console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})