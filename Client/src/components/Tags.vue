<template>
  <div class="tags-container">
    <img v-if="recipe.vegetarian" :src="require('@/assets/vegetarian.png')" alt="Vegetarian" class="tag-icon" @error="handleImageError">
    <img v-if="recipe.vegan" :src="require('@/assets/vegan.png')" alt="Vegan" class="tag-icon" @error="handleImageError">
    <img v-if="recipe.glutenFree" :src="require('@/assets/gluten.png')" alt="Gluten Free" class="tag-icon" @error="handleImageError">
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageError(event) {
      // Handle image load error
      event.target.style.display = 'none'; // Hide the image if it fails to load
    }
  }
};
</script>

<style scoped>
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
