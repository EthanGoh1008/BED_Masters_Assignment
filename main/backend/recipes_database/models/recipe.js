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
    ); // Convert rows to Recipe objects
  }

  static async getRecipesById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = "SELECT * FROM FoodRecipes WHERE id = @id"; // Parameterized query

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

  static async createRecipe(newRecipeData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery =
      "INSERT INTO FoodRecipes (title, image_url) VALUES (@title, @image_url); SELECT SCOPE_IDENTITY() AS id;";

    const request = connection.request();
    request.input("title", newRecipeData.title);
    request.input("image_url", newRecipeData.image_url);

    const result = await request.query(sqlQuery);

    connection.close();


  }

  static async updateRecipe(id, newRecipeData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery =
      "UPDATE FoodRecipes SET title = @title, image_url = @image_url WHERE id = @id";

    const request = connection.request();
    request.input("id", id);
    request.input("title", newRecipeData.title || null);
    request.input("image_url", newRecipeData.image_url || null);

    await request.query(sqlQuery);

    connection.close();

    return this.getRecipeById(id);
  }

  static async deleteRecipe(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = "DELETE FROM FoodRecipes WHERE id = @id";

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    await connection.close();

    return result.rowsAffected > 0;
  }
}

module.exports = Recipe;
