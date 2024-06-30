const dbConfig = {
  user: "booksapi_user",
  password: "123",
  server: "localhost",
  database: "user_management_db",
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    enableArithAbort: true,
    trustServerCertificate: true, // Add this line
  },
};

module.exports = dbConfig;
