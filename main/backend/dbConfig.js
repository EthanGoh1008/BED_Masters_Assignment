const sql = require("mssql");

const config = {
  user: "booksapi_user",
  password: "123",
  server: "localhost",
  database: "user_management_db",
  JWT_SECRET:
    "314c0a5fb23ddb01bfd8dd4264e3367a2b8b3cea34b99d691486906190a105debeb1eb764744e02427a0e6369255660c75dcf5652bc218f912a58bed6402f5fe",
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
