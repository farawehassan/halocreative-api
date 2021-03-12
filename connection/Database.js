//const sql = require('mssql') 

//const connectDB = async () => {
//  try {
//    // config for your database
//    var config = {
//      user: process.env.SQL_USER,
//      password: process.env.SQL_PASSWORD,
//      server: process.env.SQL_SERVER, 
//      database: process.env.SQL_DATABASE,
//      "options": {
//        "encrypt": true,
//        "enableArithAbort": true
//      } 
//    };

    // connect to your database
//    sql.connect(config, function (err) {
//      if (err) {
//        console.log(err);
//        throw err;
//      }
//      console.log('DB connection successful!');
      // create Request object
//      var request = new sql.Request();
         
      // query to the database and get the records
//      request.query('select * from [HalloCreatives].[Customers]', function (err, recordset) {
          
//          if (err) console.log(err)
//
          // send records as a response
//          console.log(recordset);
          
//      });
//  });
//  } catch (err) {
//    console.log(err);
//    throw err;
//  }
//};

//module.exports = connectDB;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
  dialect: 'mysql',
  host: process.env.SQL_SERVER
  //logging: false
});

//const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
//  host: "DESKTOP-DUBMEUA", //process.env.SQL_SERVER,
//  port: "1433",  // <----------------The port number you copied
//  dialect: "mssql",
//  dialectOptions: {
//    options: {
//        encrypt: true,
//        enableArithAbort: true,
//        instanceName: "SQLEXPRESS"
//    }
//  }
//});
 
module.exports = sequelize;