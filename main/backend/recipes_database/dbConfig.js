module.exports = {
  user: "recipes_user", // Replace with your SQL Server login username
  password: "foodisgood", // Replace with your SQL Server login password
  server: "localhost",
  database: "bed_masters_db",
  trustServerCertificate: true,
  options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
};
