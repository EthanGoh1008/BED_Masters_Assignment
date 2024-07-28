const sql = require("mssql");

const config = {
  user: "booksapi_users",
  password: "catlord",
  server: "localhost",
  database: "bed_db1",
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

console.log("Database Config:", config);

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message, err);
    throw new Error("Database connection failed");
  });

module.exports = { sql, poolPromise };
