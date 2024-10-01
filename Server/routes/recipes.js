var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

const user_utils = require("./utils/user_utils");



/**
 * Returns a preview of a recipe by its ID.
 * @param {string} recipeId - The ID of the recipe to retrieve.
 * @returns {Object} - An object containing the recipe preview details.
 */
router.get("/preview/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipePreviewByID(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * Returns a preview of a user's recipe by its ID.
 * @param {string} recipeId - The ID of the user's recipe to retrieve.
 * @returns {Object} - An object containing the recipe preview details along with status and success indicators.
 */
router.get("/myRecipePreview/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getMyRecipePreviewsByID(req.params.recipeId);
    res.status(200).send({ recipePreview: recipe, status: 200, success: true });
  } catch (error) {
    next(error);
  }
});


/**
 * Returns the full details of a recipe by its ID.
 * @param {string} recipeId - The ID of the recipe to retrieve.
 * @returns {Object} - An object containing the full recipe details along with status and success indicators.
 */
router.get("/fullDetails/:recipeId", async (req, res, next) => {
  try {
    const recipeDetails = await recipes_utils.getRecipeFullDetailsByID(req.params.recipeId);
    res.status(200).send({ recipe: recipeDetails, status: 200, success: true });
  } catch (error) {
    next(error);
  }
});

/**
 * Returns the full details of a user's recipe by its ID.
 * @param {string} recipeId - The ID of the user's recipe to retrieve.
 * @returns {Object} - An object containing the full recipe details along with status and success indicators.
 */
router.get("/myRecipesFullDetails/:recipeId", async (req, res, next) => {
  try {
    const recipeDetails = await recipes_utils.getMyRecipeFullDetailsByID(req.params.recipeId);
    res.status(200).send({ recipe: recipeDetails, status: 200, success: true });
  } catch (error) {
    next(error);
  }
});

/**
 * Returns a list of random recipe previews based on the specified number.
 * @param {number} number - The number of random recipes to retrieve (provided in query string).
 * @returns {Object} - An object containing an array of random recipe previews along with status and success indicators.
 */
router.get("/random", async (req, res, next) => {
  try {
    const recipes = await recipes_utils.getRandomRecipePreview(req.query.number);
    res.status(200).send({ randomRecipes: recipes, status: 200, success: true });
  } catch (error) {
    next(error);
}
});

/**
 * Searches for recipes based on various filters and returns a list of recipe previews.
 * @param {string} query - The search query (e.g., recipe name or keyword).
 * @param {string} cuisine - The type of cuisine to filter by.
 * @param {string} diet - The diet type to filter by (e.g., vegetarian, vegan).
 * @param {string} intolerances - Any food intolerances to filter by.
 * @param {string} sort - The sorting order for the results.
 * @param {number} number - The number of recipes to return.
 * @returns {Object[]} - An array of recipe preview objects matching the search criteria.
 */
router.get("/search", async (req, res, next) => {
  try {
    const { query, cuisine, diet, intolerances, sort, number } = req.query;
    const recipes = await recipes_utils.searchRecipePreview(query, cuisine, diet, intolerances, sort, number);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
