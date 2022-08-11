const { Pool } = require('pg');
const { HOST, PSQL_USER, PASSWRD, PORT, DATABASE } = require('../client/src/config/config.js');

const pool = new Pool({
  host: HOST,
  user: PSQL_USER,
  password: PASSWRD,
  port: PORT,
  database: DATABASE
})

// pool.connect()
//   .then(() => {
//     console.log('Successfully connected to DB!');
//   })
//   .catch(err => {
//     console.log(err);
//   })

module.exports = pool;