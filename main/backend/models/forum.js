const db = require("../db");

async function getForums() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM Forums", (err, results) => {
      if (err) {
        console.error("Error retrieving forums:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getForums,
};
