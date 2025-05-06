const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool({
  host: config.DB.host,
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

pool.getConnetion()
  .then(conn => {
  console.log("conncted to db);
  conn.release();
  })
  .catch(err => {
    console.error("failed to connect to db", ree.message);
  });
