const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",      // put your MySQL password
  database: "Smartpark"
});

module.exports = db;
