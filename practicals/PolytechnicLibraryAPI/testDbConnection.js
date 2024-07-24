require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true, // Add this line if you are using self-signed certificates
  },
};

async function testConnection() {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to MSSQL");
    const result = await pool.request().query("SELECT 1 as number");
    console.log("Test query result:", result.recordset[0].number);
    await pool.close(); // Close the connection after the test
  } catch (err) {
    console.error("Database connection failed: ", err.message);
  }
}

testConnection();
