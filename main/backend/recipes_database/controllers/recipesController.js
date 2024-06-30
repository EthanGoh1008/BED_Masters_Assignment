const Recipe = require("../models/recipe"); // Ensure this matches your actual model file name

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving recipes");
  }
};

const getRecipeById = async (req, res) => {
  // Corrected function name
  const recipeId = parseInt(req.params.id);
  try {
    const recipe = await Recipe.getRecipesById(recipeId); // Corrected method name
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving recipe");
  }
};

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  try {
    const createdRecipe = await Recipe.createRecipe(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating recipe");
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const newRecipeData = req.body;

  try {
    const updatedRecipe = await Recipe.updateRecipe(recipeId, newRecipeData);
    if (!updatedRecipe) {
      return res.status(404).send("Recipe not found");
    }
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating recipe");
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = parseInt(req.params.id);

  try {
    const success = await Recipe.deleteRecipe(recipeId);
    if (!success) {
      return res.status(404).send("Recipe not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting recipe");
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById, // Corrected export name
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
