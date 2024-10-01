<template>
  <div class="recipe-container">
    <div class="cover-image-container">
      <img src="@/assets/recipePage.jpg" alt="Recipe Page" class="full-width-image" />
      <h1 class="cover-text">{{ recipe.title }}</h1>
    </div>
    <div class="recipe-content">
      <div class="details-container">
        <div class="recipe-details">
          <img :src="recipe.image" alt="Recipe Image" class="about-us-image" />
          
          <!-- Ingredients and Instructions -->
          <div class="ingredients">
            <h3 class="section-title">Serving {{ recipe.servings }} peoples</h3>
            <h3 class="section-title">Ingredients:</h3>

            <ul>
              <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
                {{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.name }}
              </li>
            </ul>
          </div>
          <div class="instructions">
            <h3 class="section-title">Instructions</h3>
            <ul>
              <li v-for="instruction in recipe.analyzedInstructions" :key="instruction.step">
                {{ instruction.step }}
              </li>
            </ul>
          </div>
          <div class="summary">
            <h3 class="section-title">Summary</h3>
            <p v-html="recipe.summary"></p>
          </div>
        </div>

        <!-- Recipe Preview Card -->
        <div style="position: relative">
          <div class="recipe-preview-card" id="bulbul">
            <RecipePreview
              :recipe="recipe"
              :spoonRecipes="spoonRecipe"
              :showLikeButton="showLike"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RecipePreview from "../components/RecipePreview";
import { getRecipePage, getMyRecipePage } from "../services/recipes.js";

export default {
  name: "recipe",
  components: {
    RecipePreview, // Importing RecipePreview component for displaying the recipe preview
  },
  data() {
    return {
      showDetails: false,
      recipeID: this.$route.params.recipeID,
      recipe: null,
      spoonRecipe: this.$route.params.isSpoonRecipe,
      recipePreview: [],
    };
  },
  computed: {
    showLike() {
      // If the user is logged in, show the like button only for Spoonacular recipes
      if( this.$root.store.username){
        return this.$route.params.isSpoonRecipe
      }
      return false
    }
  },
  mounted() {
    this.getRecipe();
    this.fetchPreview();
  },
  methods: {
     /**
     * Fetch the recipe details based on the recipe ID and type (spoonRecipe or custom).
     */
    async getRecipe() {
      try {
        let response_full = null;
        if(this.spoonRecipe){
          response_full = await getRecipePage(this.recipeID);
        }
        else{
          response_full = await getMyRecipePage(this.recipeID);
        }
        // Check if the response is successful and store the recipe details
        if (response_full.data.status === 200 && response_full.data.success) {
          const recipeDetails = response_full.data.recipe;
          this.recipe = recipeDetails;
        }
        }
        catch (error) 
        {
          console.error("Error during recipe retrivel:", error);
          this.$root.toast("Error", "something went wrong, please try again later");
        }
    },
     /**
     * Fetch the preview of the recipe to display on the page.
     */
    async fetchPreview() {
      try{
        this.recipePreview.push(this.recipe);  
      }
      catch (error) 
      {
        console.log(error);
      }
  },
}};
</script>

<style>
.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  background-color: #151718;
}
.cover-image-container {
  position: relative;
  text-align: center;
  color: white;
  width: 100%;
}

.full-width-image {
  width: 100%;
  height: 500px; /* Adjust the height here */
  object-fit: cover;
}

.cover-text {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  padding: 10px;
  border-radius: 6px;
}

.recipe-content {
  display: flex;
  justify-content: center;
  width: 80%;
  background-image: url("@/assets/b2.jpg");
  margin-left: 0%;
}

.details-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 20px; /* Adjust spacing as needed */
}

.recipe-details {
  flex: 1;
  text-align: left;
  font-family: Arial, sans-serif;
  color: #ffffff;
  margin-right: 20px; /* Adjust spacing */
}

.recipe-preview-card {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 200px;
  height: auto;
  z-index: 10;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.ingredients,
.instructions,
.summary {
  margin-top: 20px;
}

.section-title {
  font-size: 2em;
  margin-bottom: 10px;
  color: #94cb9c;
  font-weight: bold;
}

.ingredients ul,
.instructions ul,
.summary p {
  list-style-type: disc;
  margin-left: 20px;
  padding-left: 20px;
}

.ingredients ul li,
.instructions ul li,
.summary p {
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}
</style>
