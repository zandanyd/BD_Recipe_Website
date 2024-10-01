<template>
  <div class="recipe-container">
    <link rel="stylesheet" href="http://static.sasongsmat.nu/fonts/vegetarian.css" />
    <div class="recipe-card-wrapper">
      <router-link :to="{ name: 'recipe', params: { recipeID: recipe.id, isSpoonRecipe: spoonRecipe } }" class="recipe-preview">
          <b-card v-if="image_load" :img-src="recipe.image" img-alt="Image" tag="article" class="recipe-image" style="height: 100%" @click="addLastViewRecipe"></b-card>
        </router-link>
        <div class="recipe-footer-content">
          <div :title="recipe.title" class="recipe-title">
            <b-card-text>{{ recipe.title }}</b-card-text>
          </div>
          <ul class="recipe-overview">
            <li>| {{ recipe.readyInMinutes }} | minutes</li>
            <li v-if="spoonRecipe"> |  {{ recipe.aggregateLikes }} | likes</li>
          </ul>
        </div>
          <tags :recipe="recipe"/>
        <br><br>
          <like :recipeId ="recipe.id" :LoggedIn="showLikeButton"/>
          <watch :recipeID="recipe.id"/>      
  </div>
  </div>
</template>

<script>
import { addLastViewRecipes } from "../services/user.js";
import Like from "../components/Like.vue";
import Watch from "../components/Watch.vue";
import Tags from "../components/Tags.vue";

export default {
  components:{
      Like,
      Watch,
      Tags
  },
  mounted() {
    this.axios.get(this.recipe.image).then(() => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: true,
    };
  },
  props: {
    spoonRecipe: {
      type: Boolean,
      default: true
    },
    recipe: {
      type: Object,
      required: true
    },
    showLikeButton: {
      type: Boolean,
      default: true
    },
   
  },
  methods: {
    /**
     * Adds the recipe to the last viewed list if it's a spoon recipe.
     */
    async addLastViewRecipe() {
      if(this.spoonRecipe){
        const response = await addLastViewRecipes(this.recipe.id);
        if(response.data.status === 200 && response.data.success) {
        }
        else{
          console.error("Error adding to last view:", error);
        }
    }

  }
}};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap");

.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background: #fff; /* Optional: Add a background color to see the spacing more clearly */
  border-radius: 5px; /* Optional: Add some rounding to the corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
  height: 100%;
}

.recipe-preview {
  display: inline-block;
  width: 100%;
  position: relative;

}

.recipe-card-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for the scale and shadow */
}
.recipe-card-wrapper:hover {
  transform: scale(1.15); /* Scale up the card slightly */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Enhance the shadow on hover */
}

.image-container {
  flex: 1;
}

.recipe-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
  
}

.recipe-footer-content {
  width: calc(100% - 50px);
  color: black;
  max-height: 60%;
}

.recipe-title {
  padding: 3px 5px;
  width: 100%;
  font-size: 12px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-weight: bold;
}

.card-body {
  margin: 0;
  padding: 0;
}

.recipe-overview {
  width: 100%;
  display: flex;
  table-layout: fixed;
  margin-left: 0;
  padding-left: 0;
  margin-bottom: 0px;
  font-size: 10px;
  font-weight: bold;
  max-height: 20%;
}

.recipe-overview li {
  flex-grow: 1;
  display: table-cell;
  text-align: center;
}
.tags{
  margin-top: 30px;
}

</style>