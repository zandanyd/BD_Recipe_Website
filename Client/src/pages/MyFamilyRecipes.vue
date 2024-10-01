<template>
  <!-- Template for displaying family recipes -->
  <div style="background-color: #fff;">
    <!-- Cover image and title -->
    <div class="cover-image-container">
      <img src="@/assets/Family.jpg" alt="Family Picture" class="full-width-image" />
      <h1 class="cover-text">My Family Recipes</h1>
    </div>
    <!-- Loop through recipes and display each recipe section -->
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-section">
      <!-- Recipe image and owner -->
      <div class="recipe-image-container">
        <img :src="recipe.picture" alt="Recipe Picture" class="recipe-image" />
        <h2 class="recipe-owner">{{ recipe.owner }}'s Recipe</h2>
      </div>
      <!-- Recipe details including name, ingredients, and instructions -->
      <div class="recipe-details">
        <h1>{{ recipe.name }}</h1>
        <br>
        <h2><strong>Usually made in:</strong> {{ recipe.when_usually_made }}</h2>
        <br>
        <h2><strong>Ingredients:</strong></h2>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <br>
        <h2><strong>Instructions:</strong></h2>
        <ul>
          <li v-for="(instruction, index) in recipe.instructions.split('\n')" :key="index">{{ instruction }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * Array of recipe objects to be displayed.
       * Each recipe includes an id, name, picture, owner, usual occasion, ingredients, and instructions.
       * @type {Array<Object>}
       */
      recipes: [
        {
          id: 1,
          name: "Nirit's Butter Cake",
          picture: require('@/assets/grandma1.jpg'),
          owner: "Nirit",
          when_usually_made: "Hanukkah",
          ingredients: [
            "1 cup of sugar",
            "2 cups of all-purpose flour",
            "1/2 cup of unsalted butter",
            "1 teaspoon of baking powder",
            "1/2 cup of milk",
            "1 teaspoon of vanilla extract"
          ],
          instructions: `1. Preheat your oven to 350°F (175°C).
          2. In a bowl, cream together the butter and sugar until light and fluffy.
          3. Mix in the vanilla extract.
          4. Sift together the flour and baking powder, then gradually add to the butter mixture, alternating with the milk.
          5. Pour the batter into a greased 9x9 inch baking pan.
          6. Bake for 25-30 minutes, or until a toothpick inserted into the center comes out clean.
          7. Let cool before slicing and serving.`
        },
        {
          id: 2,
          name: "Roast Turkey",
          picture: require('@/assets/grandma2.jpg'),
          owner: "Lea",
          when_usually_made: "Rosh Hashanah",
          ingredients: [
            "2 lbs of turkey",
            "1 cup of cranberry sauce",
            "3 cups of stuffing",
            "1 onion, chopped",
            "2 celery stalks, chopped",
            "2 tablespoons of olive oil",
            "Salt and pepper to taste"
          ],
          instructions: `1. Preheat your oven to 325°F (165°C).
          2. Rub the turkey with olive oil, salt, and pepper.
          3. Place the onion and celery inside the turkey cavity.
          4. Roast the turkey in a roasting pan for 3-4 hours, or until the internal temperature reaches 165°F (75°C).
          5. Baste the turkey every 30 minutes with the pan juices.
          6. In the last 30 minutes, add the stuffing to the pan and bake until golden brown.
          7. Let the turkey rest for 20 minutes before carving. Serve with cranberry sauce and stuffing.`
        },
        {
          id: 3,
          name: "Birthday Vanilla Cake",
          picture: require('@/assets/grandma3.jpg'),
          owner: "Sima",
          when_usually_made: "Birthday",
          ingredients: [
            "3 cups of all-purpose flour",
            "2 cups of sugar",
            "1 cup of milk",
            "1/2 cup of vegetable oil",
            "3 large eggs",
            "2 teaspoons of baking powder",
            "1 teaspoon of vanilla extract",
            "1/4 teaspoon of salt"
          ],
          instructions: `1. Preheat your oven to 350°F (175°C).
          2. In a bowl, mix the flour, sugar, baking powder, and salt.
          3. In another bowl, whisk together the milk, vegetable oil, eggs, and vanilla extract.
          4. Gradually add the wet ingredients to the dry ingredients, mixing until just combined.
          5. Pour the batter into a greased and floured 9x13 inch baking pan.
          6. Bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.
          7. Let the cake cool in the pan for 10 minutes, then transfer to a wire rack to cool completely. Frost as desired.`
        }
      ]
    };
  }
};
</script>

<style scoped>
.cover-image-container {
  position: relative;
  text-align: center;
  color: white;
}

.full-width-image {
  width: 100%;
  height: 400px; /* Adjust the height here */
  object-fit: cover;
}

.cover-text {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6em;
  background: rgba(0, 0, 0, 0.5); /* Optional: Add background for better readability */
  padding: 10px;
  border-radius: 6px;
}

.recipe-section {
  margin: 30px 0;
  text-align: center;
}

.recipe-image-container {
  position: relative;
  text-align: left;
}

.recipe-image {
  width: 70%;
  height: auto; /* Adjust the height here */
}

.recipe-owner {
  position: absolute;
  top: 80%;
  left: 30%;
  transform: translateX(-50%);
  font-size: 6em;
  color: white;
  background: rgba(0, 0, 0, 0.5); /* Optional: Add background for better readability */
  padding: 5px;
  border-radius: 6px;
}

.recipe-details {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  margin-left: 20px;
  margin-right: auto;
  width: 80%;
  color: #000000
}

.recipe-details h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
}
.recipe-details h1 {
  font-size: 2em;
  margin-bottom: 10px;
  font-weight: bold;
}

.recipe-details p, .recipe-details ul {
  text-align: left;
  margin: 0;
  margin-left: 30px;

}

.recipe-details ul {
  list-style: none;
  padding: 0;
}

.recipe-details ul li {
  margin: 5px 0;
}
</style>
