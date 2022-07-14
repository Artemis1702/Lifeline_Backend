 const Pool = require('pg').Pool;

 const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "organsdon",
    password: "tejas2003",
    port: 5432,
 });

 module.exports = pool;