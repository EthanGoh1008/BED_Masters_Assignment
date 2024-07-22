require("dotenv").config();

module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true, // Add this line if you are using self-signed certificates
  },
  jwtSecret: process.env.JWT_SECRET,
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    throw new Error("Database connection failed");
  });

module.exports = { sql, poolPromise };
