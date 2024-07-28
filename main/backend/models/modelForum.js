const { poolPromise } = require("../dbConfig");
const sql = require("mssql");

class Forum {
  static async getForums() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Forums");
      return result.recordset;
    } catch (error) {
      console.error("Error getting forums:", error);
      throw error;
    }
  }

  static async createForum({ title, description, image_url }) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("title", sql.NVarChar, title)
        .input("description", sql.NVarChar, description)
        .input("image_url", sql.NVarChar, image_url)
        .query(
          "INSERT INTO Forums (title, description, image_url) OUTPUT INSERTED.id VALUES (@title, @description, @image_url)"
        );
      return result.recordset[0].id;
    } catch (error) {
      console.error("Error creating forum:", error);
      throw error;
    }
  }

  static async updateForum(forumId, { title, description, image_url }) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, forumId)
        .input("title", sql.NVarChar, title)
        .input("description", sql.NVarChar, description)
        .input("image_url", sql.NVarChar, image_url)
        .query(
          "UPDATE Forums SET title = @title, description = @description, image_url = @image_url WHERE id = @id"
        );
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error updating forum:", error);
      throw error;
    }
  }

  static async deleteForum(forumId) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, forumId)
        .query("DELETE FROM Forums WHERE id = @id");
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error deleting forum:", error);
      throw error;
    }
  }
}

module.exports = Forum;
