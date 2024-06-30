const sql = require("mssql");
const pool = require("../dbConfig");

class Forum {
  static async getForums() {
    const sqlQuery = "SELECT * FROM Forums";
    const forums = await pool.query(sqlQuery);
    return forums;
  }

  static async createForum(newForumData) {
    const { title, description } = newForumData;
    const sqlQuery = "INSERT INTO Forums (title, description) VALUES (?, ?)";
    const result = await pool.query(sqlQuery, [title, description]);
    return result.insertId;
  }

  static async updateForum(forumId, updatedForumData) {
    const { title, description } = updatedForumData;
    const sqlQuery =
      "UPDATE Forums SET title = ?, description = ? WHERE id = ?";
    const result = await pool.query(sqlQuery, [title, description, forumId]);
    return result.affectedRows > 0;
  }

  static async deleteForum(forumId) {
    const sqlQuery = "DELETE FROM Forums WHERE id = ?";
    const result = await pool.query(sqlQuery, [forumId]);
    return result.affectedRows > 0;
  }
}

module.exports = Forum;
