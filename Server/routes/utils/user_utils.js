const DButils = require("./DButils");

/**
 * Marks a recipe as favorite for a specific user.
 * @param {string} user_id - The ID of the user marking the recipe as favorite.
 * @param {string} recipe_id - The ID of the recipe to be marked as favorite.
 * @throws {Object} - Throws an error if the recipe is already marked as favorite by the user.
 */
async function markAsFavorite(user_id, recipe_id){
    let usersFavorites = [];
    usersFavorites = await DButils.execQuery(`SELECT * FROM favoriterecipes`);
    if(usersFavorites.length > 0){
      if (usersFavorites.find((x) => x.user_name === user_id && x.recipe_id === recipe_id))
        throw { status: 409, message: "You allready liked this recipe" };
    }
    await DButils.execQuery(`INSERT INTO favoriterecipes VALUES ('${user_id}','${recipe_id}')`);
}

/**
 * Retrieves a list of favorite recipe IDs for a specific user.
 * @param {string} user_id - The ID of the user whose favorite recipes are to be retrieved.
 * @returns {Array} - An array of recipe IDs that the user has marked as favorite.
 */
async function getFavoriteRecipes(user_id){
  const recipes_id = await DButils.execQuery(`SELECT recipe_id FROM favoriterecipes WHERE user_name='${user_id}'`);
  return recipes_id;
}

/**
 * Retrieves the IDs of the last three recipes viewed by a specific user.
 * @param {string} user_id - The ID of the user whose last three viewed recipe IDs are to be retrieved.
 * @returns {Array} - An array of recipe IDs representing the last three recipes viewed by the user.
 */
async function getLastThreeViewedRecipes(user_id){
  const recipes_id = await DButils.execQuery(`SELECT last_three_recipes FROM lastthreeviewedrecipes WHERE user_name='${user_id}'`);
  let recipes_id_array = [];
  if (recipes_id && recipes_id.length > 0 && recipes_id[0].last_three_recipes) {
    const recipes_id_string = recipes_id[0].last_three_recipes;
    recipes_id_array = recipes_id_string.split(', ');
  }
  return recipes_id_array;
}

/**
 * Updates the list of the last three recipes viewed by a specific user.
 * @param {Array} recipes_id_array - An array of recipe IDs to be updated as the last three viewed recipes.
 * @param {string} user_id - The ID of the user whose last three viewed recipes are to be updated.
 */
async function updateLastViewedRecipe(recipes_id_array, user_id){
if (recipes_id_array.length === 1) {
await DButils.execQuery(`INSERT INTO lastthreeviewedrecipes VALUES ('${user_id}','${recipes_id_array.join(", ")}')`);
}
else{
  await DButils.execQuery(`UPDATE lastthreeviewedrecipes SET last_three_recipes='${recipes_id_array.join(", ")}' WHERE user_name='${user_id}'`);
  }
}

/**
 * Marks a recipe as viewed by a specific user.
 * @param {string} recipe_id - The ID of the recipe to be marked as viewed.
 * @param {string} user_id - The ID of the user marking the recipe as viewed.
 */
async function justWatched(recipe_id, user_id){
  const viewed = await DButils.execQuery(`SELECT * FROM lastviewedrecipes WHERE user_name='${user_id}' AND recipe_id='${recipe_id}'`);
  if(viewed.length === 1){
    return;
  }
  else{
    await DButils.execQuery(`INSERT INTO lastviewedrecipes VALUES ('${user_id}','${recipe_id}')`);
  }
}

/**
 * Checks if a specific recipe has been viewed by a specific user.
 * @param {string} user_id - The ID of the user to check.
 * @param {string} recipe_id - The ID of the recipe to check.
 * @returns {boolean} - Returns `true` if the recipe has been viewed by the user, otherwise `false`.
 */
async function isRecipeViewed(user_id, recipe_id){
      let userArrayViewed = await DButils.execQuery(`SELECT * FROM lastviewedrecipes WHERE user_name='${user_id}' AND recipe_id='${recipe_id}'`);
      if(userArrayViewed.length > 0){
      return true;
      }
      else{
      return false;
      }
}
  
/**
 * Checks if a specific recipe has been liked by a specific user.
 * @param {string} user_id - The ID of the user to check.
 * @param {string} recipe_id - The ID of the recipe to check.
 * @returns {boolean} - Returns `true` if the recipe has been liked by the user, otherwise `false`.
 */
async function isRecipeLiked(user_id, recipe_id){
  let userArrayViewed = await DButils.execQuery(`SELECT * FROM favoriterecipes WHERE user_name='${user_id}' AND recipe_id='${recipe_id}'`);
  if(userArrayViewed.length > 0){
    return true;
  }
  else{
    return false;
  }
 }
 
/**
 * Inserts a new recipe into the user's personal recipe collection.
 * @param {string} username - The username of the user adding the recipe.
 * @param {string} title - The title of the recipe.
 * @param {number} readyInMinutes - The time required to prepare the recipe.
 * @param {string} image - The URL of the recipe's image.
 * @param {number} aggregateLikes - The number of likes for the recipe.
 * @param {boolean} vegan - Indicates if the recipe is vegan.
 * @param {boolean} vegetarian - Indicates if the recipe is vegetarian.
 * @param {boolean} glutenFree - Indicates if the recipe is gluten-free.
 * @param {Array} extendedIngredients - An array of ingredients required for the recipe.
 * @param {string} summary - A brief summary of the recipe.
 * @param {Array} analyzedInstructions - An array of instructions for preparing the recipe.
 * @param {number} serving - The number of servings the recipe makes.
 */
async function insertRecipe(username, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, summary, analyzedInstructions, serving) {
    const query = `
      INSERT INTO MyRecipes (recipe_title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, summary, analyzedInstructions, extendedIngredients, serving, username)
      VALUES ('${title}', ${readyInMinutes}, '${image}', ${aggregateLikes}, ${vegan}, ${vegetarian}, ${glutenFree}, '${summary}', '${JSON.stringify(analyzedInstructions)}', '${JSON.stringify(extendedIngredients)}', '${serving}', '${username}')
    `;
    
    await DButils.execQuery(query);
}

/**
 * Retrieves all recipe IDs from the user's personal recipe collection.
 * @param {string} user_id - The ID of the user whose recipe IDs are to be retrieved.
 * @returns {Array} - An array of recipe IDs belonging to the user.
 */
async function getAllRecipesIDsByUsername(user_id){
  const recipes_id = await DButils.execQuery(`SELECT recipe_id FROM myrecipes WHERE username='${user_id}'`);
  return recipes_id;
}

/**
 * Retrieves a recipe by its ID from the user's personal recipe collection.
 * @param {string} recipe_id - The ID of the recipe to retrieve.
 * @returns {Object} - An object containing the recipe details including extended ingredients and analyzed instructions.
 * @throws {Error} - Throws an error if the recipe with the specified ID is not found.
 */
async function getRecipeById(recipe_id) {
      // Prepare the SQL query
      const query = `
        SELECT *,
          JSON_UNQUOTE(JSON_EXTRACT(extendedIngredients, '$')) AS extendedIngredients,
          JSON_UNQUOTE(JSON_EXTRACT(analyzedInstructions, '$')) AS analyzedInstructions
        FROM myrecipes
        WHERE recipe_id = ${recipe_id}`;
      
      // Execute the query
      const recipes = await DButils.execQuery(query);
    
      if (recipes.length === 0) {
        throw new Error(`Recipe with ID ${recipe_id} not found`);
      }
    
      // Parse JSON fields
      const recipe = recipes[0];
      recipe.extendedIngredients = JSON.parse(recipe.extendedIngredients);
      recipe.analyzedInstructions = JSON.parse(recipe.analyzedInstructions);
    
      return recipe;
}


exports.getRecipeById = getRecipeById
exports.getAllRecipesIDsByUsername = getAllRecipesIDsByUsername
exports.insertRecipe = insertRecipe  
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getLastThreeViewedRecipes = getLastThreeViewedRecipes;
exports.updateLastViewedRecipe = updateLastViewedRecipe;
exports.isRecipeLiked = isRecipeLiked;
exports.justWatched = justWatched;
exports.isRecipeViewed = isRecipeViewed;