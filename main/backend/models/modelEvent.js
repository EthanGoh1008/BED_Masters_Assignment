const sql = require("mssql");
const { poolPromise } = require("../dbConfig");

class Event {
  static async getEvents() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Events");
      return result.recordset;
    } catch (error) {
      console.error("Error retrieving events:", error.message);
      throw error;
    }
  }

  static async createEvent(newEventData) {
    try {
      const { title, description } = newEventData;
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("title", sql.NVarChar, title)
        .input("description", sql.NVarChar, description)
        .query(
          "INSERT INTO Events (title, description) VALUES (@title, @description); SELECT SCOPE_IDENTITY() AS id"
        );
      return result.recordset[0].id;
    } catch (error) {
      console.error("Error creating event:", error.message);
      throw error;
    }
  }
}

module.exports = Event;
