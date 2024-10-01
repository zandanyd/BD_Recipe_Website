import axios from "axios";
import shared_data from "../main"; // Adjust the path based on your project structure



/**
 * Add a recipe to the user's list of favorites.
 * @param {string} recipeId - The ID of the recipe to add to favorites.
 * @returns {Object} - The server response or an error object.
 */
export async function AddFavorite(recipeId) {
  try {
    const response = await axios.post(shared_data.server_domain + "/users/favorites", {
      user_name: shared_data.username,
      recipe_id: recipeId,
    },
    { withCredentials: true });
    return response;
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

/**
 * Add a recipe to the user's list of last viewed recipes.
 * @param {string} recipe_id - The ID of the recipe.
 * @returns {Object} - The server response or an error object.
 */
export async function addLastViewRecipes(recipe_id) {
  try {
    const response = await axios.post(shared_data.server_domain + "/users/lastViewed", {user_id : shared_data.username, recipe_id: recipe_id },
      {withCredentials: true})
    return response;
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

/**
 * Check if a recipe has been viewed by the user.
 * @param {string} recipe_id - The ID of the recipe.
 * @returns {Object} - The server response or an error object.
 */
export async function isViewedRecipe(recipe_id) {
  try {
    const response = await axios.get(shared_data.server_domain + "/users/isViewed/"+ recipe_id);
    return response;
    
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

/**
 * Add a new recipe to the user's recipe list.
 * @param {Object} recipe_details - The details of the recipe to be added.
 * @returns {Object} - The server response or an error object.
 */
export async function addNewRecipe(recipe_details) {
  try {
    const response = await axios.post(shared_data.server_domain + "/users/MyRecipes", {recipe_details },
      {withCredentials: true});
    return response;
  } catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

/**
 * Fetch the user's favorite recipes.
 * @returns {Object} - The server response or an error object.
 */
export async function GetFavoritesRecipes() {
  try {
    const response = await axios.get(shared_data.server_domain + "/users/favorites");
    return  response;
  }
  catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }
}

/**
 * Fetch the user's last three viewed recipes.
 * @returns {Object} - The server response or an error object.
 */
export async function getLastThreeRecipes() {
  try {
    const response = await axios.get(shared_data.server_domain + "/users/lastViewed");
    return  response;
  }
  catch (error) {
    // Handle error response from server
    if (error.response) {
      return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
    } else {
      return { status: 500, message: "Server error", success: false };
    }
  }}

/**
 * Fetch all recipes created by the user.
 * @returns {Object} - The server response or an error object.
 */
  export async function getMyRecipes() {
    try {
      const response = await axios.get(shared_data.server_domain + "/users/MyRecipes");
      return  response;
    }
    catch (error) {
      // Handle error response from server
      if (error.response) {
        return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
      } else {
        return { status: 500, message: "Server error", success: false };
      }
    }
  }
  export async function isLikedRecipe(recipe_id) {
    try {
      const response = await axios.get(shared_data.server_domain + "/users/isLikedRecipe/" + recipe_id);
      return  response;
    }
    catch (error) {
      // Handle error response from server
      if (error.response) {
        return { status: error.response.status, message: error.response.data.message, success: error.response.data.success };
      } else {
        return { status: 500, message: "Server error", success: false};
     }
    }
  }

  
