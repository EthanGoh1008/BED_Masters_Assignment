const sql = require("mssql");
const dbConfig = require("./config/dbConfig");

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed!", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise,
};
