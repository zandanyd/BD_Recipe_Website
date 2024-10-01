var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Middleware to authenticate incoming requests.
 * Checks if a session exists and validates the user_id.
 * Sets req.user_id if authenticated, otherwise responds with a 401 status.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_name FROM users").then((users) => {
      if (users.find((x) => x.user_name === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.status(401);
  }
});


/**
 * Adds a recipe to the favorites list of the logged-in user.
 * @route POST /favorites
 * @param {Object} req - The request object containing the recipe ID and user name in the body.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a success message if the recipe is successfully added to favorites.
 * @throws {Object} - Throws an error if the recipe cannot be added to favorites.
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.body.user_name;
    const recipe_id = req.body.recipe_id;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send({ message: "The Recipe successfully saved as favorite", status: 200, success: true } );
    } catch(error){
    next(error);
  }
})

/**
 * Retrieves the favorite recipes of the logged-in user.
 * @route GET /favorites
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a list of favorite recipes for the user.
 * @throws {Object} - Throws an error if the favorites cannot be retrieved.
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = recipes_id.map(element => element.recipe_id);
    const results = await recipe_utils.getRecipePreviewsByIDs(recipes_id_array);
    res.status(200).send({ recipes: results, status: 200, success: true });
  } catch(error){
    next(error); 
  }
});

/**
 * Checks if a specific recipe is liked by the logged-in user.
 * @route GET /isLikedRecipe/:recipeId
 * @param {Object} req - The request object containing the recipe ID in the URL parameters.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns whether the recipe is liked or not.
 * @throws {Object} - Throws an error if the check cannot be performed.
 */
router.get('/isLikedRecipe/:recipeId', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;
    let isLiked = await user_utils.isRecipeLiked(user_id, recipe_id);
    res.status(200).send({liked: isLiked, status: 200, success: true });
  } catch(error){
    next(error);
  }
});

/**
 * Retrieves the last three viewed recipes of the logged-in user.
 * @route GET /lastViewed
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns the last three viewed recipes.
 * @throws {Object} - Throws an error if the viewed recipes cannot be retrieved.
 */
router.get('/lastViewed', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getLastThreeViewedRecipes(user_id);
    const isViewed = [true, true, true];
    let recipes_id_int_array = [];
    if (recipes_id.length > 0) {
      const recipes_id_string_array = recipes_id.map(id => id.toString());
      recipes_id_int_array = recipes_id_string_array.map(str => parseInt(str, 10));
    }
    let results = [];
    results = await recipe_utils.getRecipePreviewsByIDs(recipes_id_int_array);
    res.status(200).send({ recipes: results, viewed: isViewed, status: 200, success: true });
  } catch(error){
    next(error);
  }
});

/**
 * Checks if a specific recipe has been viewed by the logged-in user.
 * @route GET /isViewedRecipe/:recipeId
 * @param {Object} req - The request object containing the recipe ID in the URL parameters.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns whether the recipe has been viewed or not.
 * @throws {Object} - Throws an error if the check cannot be performed.
 */
router.get('/isViewed/:recipeId', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;
    let isViewed = await user_utils.isRecipeViewed(user_id, recipe_id);
    res.status(200).send({viewed: isViewed, status: 200, success: true });
  } catch(error){
    next(error);
  }
});

/**
 * Updates the list of recently viewed recipes for the logged-in user.
 * @route POST /lastViewed
 * @param {Object} req - The request object containing the recipe ID and user ID in the body.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a success message if the recipe is successfully added to the last viewed list.
 * @throws {Object} - Throws an error if the recipe cannot be updated.
 */
router.post('/lastViewed', async (req,res,next) => {
  try{
    const user_id = req.body.user_id;
    let recipes_id_array = [];
    recipes_id_array = await user_utils.getLastThreeViewedRecipes(user_id);
    let recipe_id_str = String(req.body.recipe_id);
    if(!recipes_id_array.includes(recipe_id_str)){
      recipes_id_array.push(req.body.recipe_id);
      if(recipes_id_array.length === 4){
        recipes_id_array.shift();
      }
      await user_utils.updateLastViewedRecipe(recipes_id_array, user_id);
      await user_utils.justWatched(req.body.recipe_id, user_id);

    }
    else{
      let last_viewed_recipes = [];
      if (recipes_id_array.length > 1){
        for (recipe of recipes_id_array){
          if(recipe != recipe_id_str){
            last_viewed_recipes.push(recipe);
          }
        }
      last_viewed_recipes.push(req.body.recipe_id);
      await user_utils.updateLastViewedRecipe(last_viewed_recipes, user_id);
    }
  }
      res.status(200).send({ message: "The Recipe successfully saved as favorite", status: 200, success: true } );
  } catch(error){
    next(error);
}
});

/**
 * Inserts a new recipe created by the logged-in user.
 * @route POST /MyRecipes
 * @param {Object} req - The request object containing recipe details in the body.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a success message if the recipe is successfully created.
 * @throws {Object} - Throws an error if the recipe cannot be created.
 */
router.post('/MyRecipes', async (req, res, next) => {
  try {
    const username = req.session.user_id;
    const { title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, summary, analyzedInstructions, serving } = req.body.recipe_details;
    await user_utils.insertRecipe(username, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, summary, analyzedInstructions, serving);
    res.status(200).send({ message: "Recipe successfully created", status: 200, success: true } );
  } catch (error) {
    next(error);
  }
});

/**
 * Retrieves all recipes created by the logged-in user.
 * @route GET /MyRecipes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send a response.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a list of recipes created by the user.
 * @throws {Object} - Throws an error if the recipes cannot be retrieved.
 */
router.get('/MyRecipes', async (req, res, next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getAllRecipesIDsByUsername(user_id);
    let recipes_id_array = recipes_id.map(element => element.recipe_id);
    const results = await recipe_utils.getMyRecipePreviewsByIDs(recipes_id_array);
    res.status(200).send({ recipes: results, status: 200, success: true });
  } catch(error){
    next(error); 
  }
});



module.exports = router;
