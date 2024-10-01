const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
require('dotenv').config();
const DButils = require("./DButils");




/**
 * Fetches detailed information about a specific recipe from the Spoonacular API.
 * @param {number} recipe_id - The ID of the recipe to fetch.
 * @returns {Promise} - A promise that resolves to the API response containing recipe details.
 */
async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey,
           
            }
    });}

/**
 * Fetches a specified number of random recipes from the Spoonacular API.
 * @param {number} number - The number of random recipes to fetch.
 * @returns {Promise} - A promise that resolves to the API response containing random recipes.
 */    
async function getRandomRecipes(number) {
    return await axios.get(`${api_domain}/random`, {
        params: {
            includeNutrition: false,
            instructionsRequired: true,
            apiKey: process.env.spooncular_apiKey,
            number: number
        }
    });}

    /**
 * Performs a complex search for recipes using various filters and returns the search results.
 * @param {string} query - The search query (e.g., recipe name or keyword).
 * @param {string} cuisine - The type of cuisine to filter by.
 * @param {string} diet - The diet type to filter by (e.g., vegetarian, vegan).
 * @param {string} intolerances - Any food intolerances to filter by.
 * @param {string} sort - The sorting order for the results.
 * @param {number} number - The number of recipes to return.
 * @returns {Promise} - A promise that resolves to the API response containing the search results.
 */
async function complexSearch(query, cuisine, diet, intolerances, sort, number ) {
    return await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: query,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerances,
            sort: sort,
            includeNutrition: false,
            instructionsRequired: true,
            apiKey: process.env.spooncular_apiKey,
            number: number
    }
});}

/**
 * Retrieves a preview of a recipe by its ID, including basic details like title, cooking time, and image.
 * @param {number} recipe_id - The ID of the recipe to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the recipe preview details.
 */
async function getRecipePreviewByID(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
    }
}

/**
 * Retrieves previews for a list of recipes based on their IDs.
 * @param {number[]} recipe_ids - An array of recipe IDs to fetch previews for.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of recipe preview objects.
 */
async function getRecipePreviewsByIDs(recipe_ids) {
    try {
        const recipesPreviews = await Promise.all(recipe_ids.map(async (recipe_id) => {
            return await getRecipePreviewByID(recipe_id);
        }));
        return recipesPreviews;
    } catch (error) {
      console.error(`Error fetching recipe previews:`, error);
      throw error;
    }
  }
 
  /**
 * Retrieves a user's recipe preview by its ID from the database.
 * @param {number} recipeId - The ID of the user's recipe to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the recipe preview details.
 */
async function getMyRecipePreviewsByID(recipeId) {
    const user_recipe = await DButils.execQuery(`SELECT * FROM myrecipes WHERE recipe_id='${recipeId}'`);

    if (user_recipe.length === 0) {
        throw new Error("Recipe not found");
    }
    let { recipe_id, recipe_title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = user_recipe[0];
    return {
        id: recipe_id,
        title: recipe_title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
    };
}

/**
 * Retrieves previews for a list of user recipes based on their IDs.
 * @param {number[]} recipe_ids - An array of user recipe IDs to fetch previews for.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of recipe preview objects.
 */
async function getMyRecipePreviewsByIDs(recipe_ids) {
try {
    const myRecipesPreviews = await Promise.all(recipe_ids.map(async (recipe_id) => {
        return await getMyRecipePreviewsByID(recipe_id);
    }));
    return myRecipesPreviews;
} catch (error) {
    console.error(`Error fetching recipe previews:`, error);
    throw error;
}
}

/**
 * Retrieves full details for a recipe by its ID from the Spoonacular API, including ingredients and instructions.
 * @param {number} recipe_id - The ID of the recipe to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the full recipe details.
 */  
async function getRecipeFullDetailsByID(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, summary, analyzedInstructions, servings  } = recipe_info.data;
    extendedIngredients = extendedIngredients.map(ingredient => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
        }));
    let steps = analyzedInstructions[0].steps.map(step => ({
    step: step.step
    }));

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredients,
        analyzedInstructions: steps,
        summary: summary,
        servings: servings
}}

/**
 * Retrieves full details for a user's recipe by its ID from the database, including ingredients and instructions.
 * @param {number} recipeId - The ID of the user's recipe to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the full recipe details.
 */
async function getMyRecipeFullDetailsByID(recipeId) {
    const user_recipe = await DButils.execQuery(`SELECT * FROM myrecipes WHERE recipe_id='${recipeId}'`);

    if (user_recipe.length === 0) {
        throw new Error("Recipe not found");
    }
    let { recipe_id, recipe_title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, summary, analyzedInstructions, servings  } = user_recipe[0];
    if (extendedIngredients) {
        extendedIngredients = JSON.parse(extendedIngredients);
    }

    if (analyzedInstructions) {
        instructions = JSON.parse(analyzedInstructions);
        analyzedInstructions = instructions.map((instruction, index) => ({
        step: instruction
        }));
    }    
    
    return {
        id: recipe_id,
        title: recipe_title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients: extendedIngredients,
        analyzedInstructions: analyzedInstructions,
        summary: summary,
        servings: servings
    }}

/**
 * Retrieves a preview of a specified number of random recipes from the Spoonacular API.
 * @param {number} number - The number of random recipes to fetch.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of recipe preview objects.
 */    
async function getRandomRecipePreview(number) {
    let recipes_info = await getRandomRecipes(number);
    let recipes = recipes_info.data.recipes;

    return recipes.map(recipe => {
        let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
        };
    });}

    /**
 * Searches for recipes based on various filters and retrieves previews of the results.
 * @param {string} query - The search query (e.g., recipe name or keyword).
 * @param {string} cuisine - The type of cuisine to filter by.
 * @param {string} diet - The diet type to filter by (e.g., vegetarian, vegan).
 * @param {string} intolerances - Any food intolerances to filter by.
 * @param {string} sort - The sorting order for the results.
 * @param {number} number - The number of recipes to return.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of recipe preview objects.
 */
async function searchRecipePreview(query, cuisine, diet, intolerances, sort, number) {
    let recipes_info = await complexSearch(query, cuisine, diet, intolerances, sort, number);
    let recipeIds = recipes_info.data.results.map(recipe => recipe.id);

    let recipePreviews = await Promise.all(recipeIds.map(id => getRecipePreviewByID(id)));

    return recipePreviews;
}
exports.getRecipePreviewsByIDs = getRecipePreviewsByIDs
exports.searchRecipePreview = searchRecipePreview
exports.getRandomRecipePreview = getRandomRecipePreview;
exports.getRecipeFullDetailsByID = getRecipeFullDetailsByID;
exports.getRecipePreviewByID = getRecipePreviewByID;
exports.getMyRecipePreviewsByIDs = getMyRecipePreviewsByIDs;
exports.getMyRecipePreviewsByID = getMyRecipePreviewsByID;
exports.getMyRecipeFullDetailsByID = getMyRecipeFullDetailsByID;


