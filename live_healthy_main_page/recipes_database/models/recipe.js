const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Recipe {
  constructor(id, title, image_url) {
    this.id = id;
    this.title = title;
    this.image_url = image_url;
  }

  static async getAllRecipes() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = "SELECT * FROM FoodRecipes";

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset.map(
      (row) => new Recipe(row.id, row.title, row.image_url)
    ); // Convert rows to Book objects
  }

  static async getRecipesById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM FoodRecipes WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new Recipe(
          result.recordset[0].id,
          result.recordset[0].title,
          result.recordset[0].image_url
        )
      : null; // Handle recipe not found
  }
}

module.exports = Recipe;
