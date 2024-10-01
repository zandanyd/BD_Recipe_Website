<template>
  <div class="container">
    <br><br><br><br>
    <h1 class="title">MY FAVORITE RECIPES</h1>
      <div >
          <RecipeCarousel 
          :recipes="favoriteRecipes"
          :spoonRecipes=true
          />

      </div>
      <div >
         <!-- Recipe Preview List to display favorite recipes in a list format -->
          <RecipePreviewList
            :isUserLoggedIn=false
            class="RandomRecipes center"
            :recipes="favoriteRecipes"
            :key="componentKey"
            :spoonRecipes=true
          />
        </div>
    </div>
</template>

<script>
import RecipeCarousel from "../components/RecipeCarousel";
import RecipePreviewList from "../components/RecipePreviewList";
import { GetFavoritesRecipes } from "../services/user.js";

export default {
  data() {
    return {
      componentKey: 0,
      favoriteRecipes: [], // Initialize an empty array for recipes
      lastViewedRecipes: [] // Initialize an empty array for last viewed recipes
    };
  },
  components: {
    RecipeCarousel,
    RecipePreviewList,
  },
  mounted() {
    this.showFavorites(); 
  },
  methods: {
    /**
     * Fetch the user's favorite recipes and store them in favoriteRecipes array.
     * If an error occurs during the fetch, log the error and show a toast notification.
     */
    async showFavorites() {
      const response = await GetFavoritesRecipes();
      if (response.data.status === 200 && response.data.success) {
        this.favoriteRecipes.push(...response.data.recipes);
      }
      else{
        console.error("Error during recipe retrivel:", error);
        this.$root.toast("Error", "something went wrong, please try again later");
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;

}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 80px;
  font-weight: bold;
}

.content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.left-side, .right-side {
  width: 45%; /* Ensure both sides have the same width */
}

.left-side {
  padding-left: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
}

.right-side {
  padding-left: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the top left */
  justify-content: flex-start; /* Align items to the top */
  padding-top: 3px; /* Adjust padding to move the login form up */
}

.RandomRecipes {
  margin: 10px 0 10px;
  padding-left: 5px;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.connected {
  visibility: hidden;
}

.container-random, .container-user {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: flex-end; /* Align content at the bottom */
  align-items: center; /* Center elements horizontally */
  position: relative; /* Enable positioning for child elements */
  width: 120%; /* Ensure both containers take the full width of their parent */
  height: 100%; /* Ensure both containers take the full height of their parent */
  margin-left: 0%;
  padding-left: 0%;
}

</style>
