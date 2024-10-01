<template>
  <div class="carousel-container">
    <!-- Bootstrap Vue carousel component with controls and indicators -->
    <b-carousel v-model="slide"
      :interval="4000"
      controls
      indicators
      style="border: 100px; background-color: #fff;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      prev-icon="fas fa-chevron-left"
      next-icon="fas fa-chevron-right"
    >
      <!-- Carousel slide for each recipe -->
      <b-carousel-slide v-for="recipe in recipes" :key="recipe.id">
        <template #img>
          <!-- Recipe image and clickable area -->
          <img :src="recipe.image" alt="Recipe Image" class="recipe-image" @click="goToRecipe(recipe.id)"/>
          <div class="recipe-info">
            <!-- Recipe title and overview -->
            <div class="recipe-footer-content">
              <div :title="recipe.title" class="recipe-title">
                <b-card-text>{{ recipe.title }}</b-card-text>
                <br>
              </div>
              <ul class="recipe-overview">
                <li>{{ recipe.readyInMinutes }} minutes</li>
                <li v-if="spoonRecipes">{{ recipe.aggregateLikes }} likes</li>
              </ul>
            </div>
            <!-- Dietary tags -->
            <div class="tags-container">
              <img v-if="recipe.vegetarian" src="@/assets/vegetarian.png" alt="Vegetarian" class="tag-icon">
              <img v-if="recipe.vegan" src="@/assets/vegan.png" alt="Vegan" class="tag-icon">
              <img v-if="recipe.glutenFree" src="@/assets/gluten.png" alt="Gluten Free" class="tag-icon">
            </div>
          </div>
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>


<script>
import { BCarousel, BCarouselSlide } from 'bootstrap-vue';
import { addLastViewRecipes } from "../services/user.js";

export default {
  components: {
    BCarousel,
    BCarouselSlide
  },
  props: {
    recipes: {
      type: Array,
      required: true
    },
    spoonRecipes: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slide: 0, // Current slide index
      sliding: null // Flag to indicate sliding status
    };
  },
  methods: {
    /**
     * Event handler triggered when sliding starts.
     * Sets the `sliding` flag to true.
     * @param {number} slide - The index of the current slide.
     */
    onSlideStart(slide) {
      this.sliding = true;
    },
    /**
     * Event handler triggered when sliding ends.
     * Sets the `sliding` flag to false.
     * @param {number} slide - The index of the current slide.
     */
    onSlideEnd(slide) {
      this.sliding = false;
    },
    /**
     * Navigate to the recipe details page and optionally add the recipe to last viewed.
     * @param {number} recipeId - The ID of the recipe to navigate to.
     */
    async goToRecipe(recipeId) {
      if(this.spoonRecipes){
        const response = await addLastViewRecipes(recipeId);
        if(! (response.data.status === 200 && response.data.success)) {
          console.error("Error adding to last view:", error);
        }
    
    }
    this.$router.push({ name: 'recipe', params: { recipeID: recipeId, isSpoonRecipe: this.spoonRecipes} });
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.recipe-image {
  width: 300px; /* Adjust the width as needed */
  height: 300px; /* Adjust the height as needed */
  display: block;
  cursor: pointer; /* Indicate that the image is clickable */
}

.recipe-info {
  max-width: 400px; /* Adjust the max-width as needed */
  text-align: center;
  margin-top: 5px; /* Add margin between image and info */
  font-weight: bold;
  font-size: 15px;
}

.recipe-overview {
  width: 100%;
  display: flex;
  table-layout: fixed;
  margin-left: 0;
  padding-left: 0;
  margin-bottom: 0px;
  font-size: 15px;
  font-weight: bold;
}

.recipe-overview li {
  flex-grow: 1;
  display: table-cell;
  text-align: center;
}

.tags-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin-top: 10px;
}

.tag-icon {
  width: 40px;
  height: 40px;
  margin-right: 5px;
}
</style>
