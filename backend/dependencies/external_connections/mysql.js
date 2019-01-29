const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "leaderboard"
  });
  
  mysqlConnection.connect((err) => {
    if (err) 
      throw err;
    console.log("MySQL Connected!");
  });

  module.exports = mysqlConnection;