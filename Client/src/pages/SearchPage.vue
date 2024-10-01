<template>
  <div class="search-page-container">
    <!-- Sidebar button at the top left corner -->
    <div>
      <div class="sidebar-button-container" style="padding-left: 1%; padding-top: 1%">
        <b-button v-b-toggle.filters-sidebar id="sidebar-button" class="filters-sidebar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
          </svg>
        </b-button>
      </div>
      <div class="top-container" style="padding-left: 20%;">
        <div class="search-button" style="padding-bottom: 10%; padding-right: 0">
          <b-row>
            <b-form-input size="sm" v-model="searchQuery" class="mr-sm-2 search-input" placeholder="Search for a recipe..." required></b-form-input>
            <b-button class="small-button" @click="search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </b-button>
          </b-row>
        </div>

        <!-- Sort options button to the left of the number of recipes buttons -->
        <div class="sort-options-container" style="padding-left: 2%; padding-bottom: 10%">
          <b-dropdown v-model="selectedSortOption" id="sort-options" size="sm" toggle-class="btn-sm text-decoration-none small-button" no-caret @change="search">
            <template #button-content>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
              </svg>       
            </template>
            <b-dropdown-item @click="updateSortOption('time')">Preparation Time</b-dropdown-item>
            <b-dropdown-item @click="updateSortOption('popularity')">Popularity</b-dropdown-item>
          </b-dropdown>
        </div>

        <!-- Number of recipes buttons at the top right corner -->
        <div class="num-of-showed-recipes-container" style="padding-right: 0%; padding-bottom: 10%; padding-left: 2.5%">
          <b-row class="button-row">
            <h1 class="small-heading">Presented recipes:</h1>
            <b-col cols="auto" style="padding-left: 8px; padding-right: 8px;">
              <b-button id="5-button" class="number-button small-button" @click="changeNumOfPresentedRec(5)">
                <img src="@/assets/5.png" alt="5 Button" class="small-image">
              </b-button>
            </b-col>
            <b-col cols="auto" style="padding-left: 0%; padding-right: 8px;">
              <b-button id="10-button" class="number-button small-button" @click="changeNumOfPresentedRec(10)">
                <img src="@/assets/10.png" alt="10 Button" class="small-image">
              </b-button>
            </b-col>
            <b-col cols="auto" style="padding: 0;">
              <b-button id="15-button" class="number-button small-button" @click="changeNumOfPresentedRec(15)">
                <img src="@/assets/15.png" alt="15 Button" class="small-image">
              </b-button>
            </b-col>
          </b-row>
        </div>
      </div>

      <FiltersSidebar :selectedFilters.sync="selectedFilters"/>
      
      <div v-if="username" class="searches-container">
        <div>
          <RecipePreviewList :isUserLoggedIn="$root.store.username" class="Recipes center" :recipes="recipes"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import FiltersSidebar from '../components/Filter.vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { get_search_result } from "../services/recipes.js";

export default {
  components: {
    FiltersSidebar,
    RecipePreviewList,
  },
  
  data() {
    return {
      recipes: [],
      selectedFilters: {
        cuisines: [],
        diets: [],
        intolerances: []
      },
      numOfRecipes: 5,
      selectedSortOption: "time", // Initialize with default sort option
      searchQuery: this.$route.query.q || "" // Initialize with query parameter
    };
  },
  computed: {
    username() {
      return this.$root.store.username;
    }
  },
  mounted() {
  this.initializeSearch();
},

methods: {
     /**
     * Initializes the search by checking if there are saved recipes in localStorage.
     * If found, they are loaded into the `recipes` array.
     * Otherwise, the `recipes` array is cleared (null).
     */
  async initializeSearch() {
    // Retrieve saved recipes from localStorage if they exist
    const savedRecipes = sessionStorage.getItem('savedRecipes');
    if (savedRecipes) {
      this.recipes = JSON.parse(savedRecipes);
    } else {
      this.recipes = null; // No previous search, show nothing
    }
  },
 /**
     * Changes the number of presented recipes on the page.
     * @param {Number} num - The number of recipes to display (e.g., 5, 10, 15)
     */
  async changeNumOfPresentedRec(num){
    this.numOfRecipes = num;
    this.search();
  },
  /**
     * Updates the selected sorting option (e.g., preparation time or popularity)
     * and triggers the search based on the new sort option.
     * @param {String} option - The selected sorting option
     */
  async updateSortOption(option) {
    this.selectedSortOption = option;
    this.search(); // Trigger search with the new sort option
  },
   /**
     * Executes the search for recipes based on the search query, filters, sorting, and number of recipes.
     * If the user is not logged in, a toast notification is shown, and no search is performed.
     * Results are fetched from the server and stored in localStorage for future use.
     */
  async search() {
    if (!this.$root.store.username) {
        // Show toast message
        this.$bvToast.toast('You must be logged in to search!', {
          title: 'Search Not Available',
          variant: 'warning',
          solid: true
        });
        return;
      }
    // Check if the search query is empty
    if (!this.searchQuery.trim()) {
      // If the search query is empty, clear the recipes and return
      this.recipes = null; // Show nothing since no search was made
      sessionStorage.removeItem('savedRecipes');
      return;
    }
    
    try {
      const cuisineFilters = this.selectedFilters.cuisines.join(',');
      const dietFilters = this.selectedFilters.diets.join(',');
      const intoleranceFilters = this.selectedFilters.intolerances.join(',');
      const response = await get_search_result(this.searchQuery, cuisineFilters, dietFilters, intoleranceFilters, this.selectedSortOption, this.numOfRecipes);

      if (response.status === 200) {
        this.recipes = response.data;
        if (this.recipes.length === 0) {
          this.$root.toast("Failed", "Can't find recipes");
        } else {
          // Save results to localStorage
          sessionStorage.setItem('savedRecipes', JSON.stringify(this.recipes));
        }
      } else {
        this.$root.toast("Failed", "Can't find recipes");
      }
    } catch (error) {
      console.error("Error during search:", error);
      this.$root.toast("Error", "An error occurred during the search");
    }
  }
},
    // Watch for changes in the query parameter and trigger a search if it changes
  watch: {
    '$route.query.q': 'search' // Watch for changes in the query parameter
  }
};
</script>

<style scoped>
.filters-sidebar-container {
  display: flex;
  align-items: flex-start;
}

.filters-sidebar-content {
  width: 100%;
}

.filters-sidebar-content > .mb-3 {
  margin-bottom: 1rem;
}

.cuisines-dropdown,
.diets-dropdown,
.intolerances-dropdown {
  width: 100%;
  max-width: 100%;
  padding-right: 15px;
}

.cuisines-dropdown-options {
  max-height: 300px;
  overflow-y: auto;
}

.top-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.recent-searches-container {
  visibility: visible;
}

.button-row {
  display: flex;
  margin-top: 10px;
}

.number-button {
  margin: 0 0;
}

.small-button {
  padding: 0.25rem 0.5rem;
}

.small-image {
  width: 20px;
  height: 20px;
}

.small-heading {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.filters-sidebar-button-container {
  padding: 0.25rem 0.5rem;
}

.search-input {
  width: 400px;
}
</style>
