const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Forum {
  static async getForums() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query("SELECT * FROM Forums");
      return result.recordset;
    } catch (error) {
      console.error("Error retrieving forums:", error.message);
      throw error;
    }
  }

  static async createForum(newForumData) {
    try {
      const { title, description, image_url } = newForumData;
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("title", sql.NVarChar, title)
        .input("description", sql.NVarChar, description)
        .input("image_url", sql.NVarChar, image_url) // Ensure image_url is provided
        .query(
          "INSERT INTO Forums (title, description, image_url) VALUES (@title, @description, @image_url); SELECT SCOPE_IDENTITY() AS id"
        );
      await pool.close();
      return result.recordset[0].id;
    } catch (error) {
      console.error("Error creating forum:", error.message);
      throw error;
    }
  }

  static async updateForum(forumId, updatedForumData) {
    try {
      const { title, description } = updatedForumData;
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("id", sql.Int, forumId)
        .input("title", sql.NVarChar, title)
        .input("description", sql.NVarChar, description)
        .query(
          "UPDATE Forums SET title = @title, description = @description WHERE id = @id"
        );
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error updating forum:", error.message);
      throw error;
    }
  }

  static async deleteForum(forumId) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("id", sql.Int, forumId)
        .query("DELETE FROM Forums WHERE id = @id");
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error deleting forum:", error.message);
      throw error;
    }
  }
}

module.exports = Forum;
