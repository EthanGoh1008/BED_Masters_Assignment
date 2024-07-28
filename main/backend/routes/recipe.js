const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const validateRecipe = require("../middlewares/validateRecipe");

// Route to get all recipes
router.get("/", recipesController.getAllRecipes);

// Route to get a single recipe by ID
router.get("/:id", recipesController.getRecipeById);

// Route to create a new recipe
router.post("/", validateRecipe, recipesController.createRecipe);

// Route to update a recipe by ID
router.put("/:id", validateRecipe, recipesController.updateRecipe);

// Route to delete a recipe by ID
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
