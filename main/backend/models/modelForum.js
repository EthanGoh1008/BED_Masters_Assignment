const { poolPromise } = require("../dbConfig");
const sql = require("mssql");

class Forum {
  static async getForums() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Forums");
      return result.recordset;
    } catch (error) {
<<<<<<< HEAD
      console.error("Error retrieving forums:", error.message);
=======
      console.error("Error getting forums:", error);
>>>>>>> e79db061e6686308e69106552aba2959b1de3262
      throw error;
    }
  }

<<<<<<< HEAD
  static async createForum(newForumData) {
    try {
      const { title, description, image_url } = newForumData;
=======
  static async createForum({ title, description, image_url }) {
    try {
>>>>>>> e79db061e6686308e69106552aba2959b1de3262
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("title", sql.NVarChar, title)
        .input("description", sql.NVarChar, description)
<<<<<<< HEAD
        .input("image_url", sql.NVarChar, image_url) // Ensure image_url is provided
        .query(
          "INSERT INTO Forums (title, description, image_url) VALUES (@title, @description, @image_url); SELECT SCOPE_IDENTITY() AS id"
        );
      return result.recordset[0].id;
    } catch (error) {
      console.error("Error creating forum:", error.message);
=======
        .input("image_url", sql.NVarChar, image_url)
        .query(
          "INSERT INTO Forums (title, description, image_url) OUTPUT INSERTED.id VALUES (@title, @description, @image_url)"
        );
      return result.recordset[0].id;
    } catch (error) {
      console.error("Error creating forum:", error);
>>>>>>> e79db061e6686308e69106552aba2959b1de3262
      throw error;
    }
  }

<<<<<<< HEAD
  static async updateForum(forumId, updatedForumData) {
    try {
      const { title, description, image_url } = updatedForumData;
=======
  static async updateForum(forumId, { title, description, image_url }) {
    try {
>>>>>>> e79db061e6686308e69106552aba2959b1de3262
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
<<<<<<< HEAD
      console.error("Error updating forum:", error.message);
=======
      console.error("Error updating forum:", error);
>>>>>>> e79db061e6686308e69106552aba2959b1de3262
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
<<<<<<< HEAD
      console.error("Error deleting forum:", error.message);
=======
      console.error("Error deleting forum:", error);
>>>>>>> e79db061e6686308e69106552aba2959b1de3262
      throw error;
    }
  }
}

module.exports = Forum;
