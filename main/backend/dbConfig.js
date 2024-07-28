const sql = require("mssql");

const config = {
  user: "recipes_user",
  password: "foodisgood",
  server: "localhost",
  database: "bed_masters_db",
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
