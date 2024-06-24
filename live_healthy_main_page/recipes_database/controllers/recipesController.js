const Recipe = require("../models/recipe"); //IDK IF IT'S RECIPE OR RECIPES

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving recipes");
  }
};

const getRecipesById = async (req, res) => {
  const recipeId = parseInt(req.params.id);
  try {
    const recipe = await Recipe.getRecipesById(recipeId);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving recipe");
  }
};

module.exports = {
  getAllRecipes,
  getRecipesById,
};
