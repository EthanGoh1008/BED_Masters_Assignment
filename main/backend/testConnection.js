const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true
  }
};

console.log('Database Config:', config);

const connectToDb = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to MSSQL");
    pool.close(); // Close the connection after testing
  } catch (err) {
    console.error("Database connection failed:", err.message, err);
  }
};

connectToDb();
