<template>
  <!-- Main container for the page layout -->
  <div class="container">
    <br><br><br><br>
    <!-- Page title -->
    <h1 class="title">Main Page</h1>
    <!-- Content area with left and right side sections -->
    <div class="content">
      <!-- Left side of the content -->
      <div class="left-side">
        <!-- Container for random recipe previews -->
        <div class="container-random">         
          <RecipePreviewList
            :isUserLoggedIn="$root.store.username" :recipes="randomRecipes" 
            style="text-align: center; font-family: Comfortaa; margin-top: 3%;"
            title="Explore these recipes"
            class="RandomRecipes center"
            :key="componentKey"
          />
        </div>
        <!-- Shuffle button to fetch new random recipes -->
        <div class="shuffle-container">
            <b-button id="shuffle-button" @click="fetchRandomRecipes"></b-button>
          </div>
      </div>
      <!-- Right side of the content -->
      <div class="right-side">
        <!-- Display last viewed recipes if the user is logged in -->
        <div v-if="$root.store.username" class="container-user">
          <RecipePreviewList
            :isUserLoggedIn="$root.store.username"
            :recipes="lastViewedRecipes"
            title="Last Viewed Recipes"
            class="RandomRecipes center"
          />
        </div>
        <!-- Display login page if the user is not logged in -->
        <div v-else class="login-container">
          <LoginPage />
        </div>
        <!-- Placeholder for additional content -->
        <div id="bthn" lang="en"></div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage";
import { getRandomRecipes} from "../services/recipes.js"; 
import {getLastThreeRecipes} from "../services/user.js"; 


export default {
  data() {
    return {
       // Key to force re-render of the RecipePreviewList component
       componentKey: 0,
      // Arrays to store recipes
      randomRecipes: [], // For random recipes
      lastViewedRecipes: [], // For last viewed recipes
      viewedRecipes: [], // For storing viewed recipes (not used in this snippet)
    };
  },
  components: {
    RecipePreviewList,
    LoginPage,
  },
  mounted() {
    // Perform actions after the component is mounted
    setTimeout(() => {
    this.fetchRandomRecipes();// Fetch random recipes
    if (this.$root.store.username) {
      this.fetchLastViewedRecipes(); // Fetch last viewed recipes if logged in
    }
    }, 1000);
    this.BringThemHome();// Load external script
  },
  methods: {
    /**
     * Fetches random recipes from the server and updates the randomRecipes data property.
     */
    async fetchRandomRecipes() {
      const response = await getRandomRecipes();
      const {randomRecipes, viewed, status, success} = response.data;
      if (status === 200 && success) {
        this.randomRecipes = randomRecipes;
      }
    },
    /**
     * Fetches the last three viewed recipes from the server and updates the lastViewedRecipes data property.
     */
    async fetchLastViewedRecipes() {
      const response = await getLastThreeRecipes();
      const {recipes, viewed, status, success} = response.data;
      if (status === 200 && success) {
        this.lastViewedRecipes = recipes;
      }
      else{
        console.error("Error during recipe retrivel:", error);
        this.$root.toast("Error", "something went wrong, please try again later");
      }
    },

  /**
     * Dynamically loads an external script and appends it to the document head.
     */
  BringThemHome () {
   var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
   script.setAttribute(
     "integrity",
     "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne"
   );
   script.setAttribute("crossorigin", "anonymous");
   document.getElementsByTagName("head")[0].appendChild(script);
 }
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

#shuffle-button {
  background-image: url('@/assets/shuffle.png');
  background-size: cover;
  background-color: transparent;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
}

.shuffle-container {
  position:absolute; /* Make element position relative to parent */
  height: 15%;
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Offset to center perfectly */
}

.login-container {
  width: 100%; /* Ensure login container takes the full width of its parent */
  height: 100%; /* Ensure login container takes the full height of its parent */
  display: flex;
  justify-content: center; /* Center login component horizontally */
  align-items: center; /* Center login component vertically */
}
</style>
