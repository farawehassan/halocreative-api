const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const connectDb = require("./connection/Database");
const dotenv = require('dotenv');
const sequelize = require('./connection/Database');
const office = require('./routes/office-routes.js');
const employees = require('./routes/employees-routes.js');
const services = require('./routes/services-routes.js');
const customers = require('./routes/customers-routes.js');
const orders = require('./routes/order-routes.js');
const payment = require('./routes/payments-routes.js');
const myserver = require('./routes/server-routes.js');
dotenv.config({ path: 'config.env' });

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
//Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  next();
});

// Routes
app.use('', myserver);
app.use('/api/office', office);
app.use('/api/employees', employees);
app.use('/api/services', services);
app.use('/api/customers', customers);
app.use('/api/orders', orders);
app.use('/api/payment', payment);

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

const port = process.env.SQL_PORT || 3306;

let server;

sequelize.sync()
  .then(() => {
    server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`App running on port ${port}...`);
    });
  })
  .catch(err => {
      console.log(err);
    console.log("Database connection failed");
  });


process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});