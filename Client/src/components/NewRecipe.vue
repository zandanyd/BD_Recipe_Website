<template>
  <div class="recipe-form-container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
           
      <!-- Title -->
      <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-title"
      >
        <b-form-input
          id="input-title"
          v-model="form.name"
          type="text"
          placeholder="Enter recipe title"
          required
        ></b-form-input>
      </b-form-group>

      <!-- Image -->
      <b-form-group class="select-image-container" label="Recipe image:">
    <div class="form-group">
      <!-- Toggle Button -->
      <b-button @click="toggleInputMode">
        {{ useUrlInput ? 'Upload File' : 'Enter URL' }}
      </b-button>
      
      <!-- File Upload -->
      <b-form-file
        label="Image:"
        v-if="!useUrlInput"
        v-model="file1"
        :state="Boolean(file1)"
        placeholder="Choose an image or drop it here..."
        drop-placeholder="Drop file here..."
        @change="handleFileChange"
        required
      ></b-form-file>
      
      <!-- URL Input -->
      <b-form-input
        v-else
        v-model="imageUrl"
        placeholder="Enter image URL..."
        required
      ></b-form-input>

      <!-- Selected File or URL Display -->
      <div class="mt-3">Selected: {{ selectedFileOrUrl }}</div>
    </div>
  </b-form-group>

      <!-- Summary -->
      <b-form-group class="summary-container" label="Summary:" label-for="input-summary">
        <b-form-textarea
          id="input-summary"
          v-model="text"
          placeholder="Enter description..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <!-- Time to make -->
      <b-form-group class="time-container" label="Time to make:">
        <b-form-timepicker v-model="time" :show-hours="false" required :hour12="false"></b-form-timepicker>
      </b-form-group>

      <!-- Serving -->
      <b-form-group class="serving-container" label="Serving:">
            <b-form-spinbutton id="serving-sb" v-model="servingAmount" min="1" max="100"></b-form-spinbutton>
      </b-form-group>

      <!-- Vegan, Vegetarian, Gluten Free -->
      <b-form-group class="checkboxes-container" label="Dietary Options:">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes"
        >
          <b-form-checkbox value="isVegetarian">Vegetarian</b-form-checkbox>
          <b-form-checkbox value="isVegan">Vegan</b-form-checkbox>
          <b-form-checkbox value="isGlutenFree">Gluten Free</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <!-- Instructions -->
      <b-form-group class="instruction-container" label="Instructions:">
        <label>Add an instruction:</label>
        <template v-if="numOfInstructions === 1">
          <b-form-input v-model="instruction" :placeholder="`${numOfInstructions}. Enter instruction...`" ></b-form-input>
        </template>
        <template v-else>
             <b-form-input v-model="instruction" :placeholder="`${numOfInstructions}.`" ></b-form-input>
        </template>
        <b-icon variant="success" icon="plus" @click="AddInstruction"></b-icon>
        <b-icon variant="danger" icon="dash" @click="RemoveInstruction"></b-icon>
      </b-form-group>

     <!-- Ingredients -->
      <b-form-group class="ingredients-container" label="Ingredients:">
        <label>Add an ingredient:</label>
        <template v-if="numOfIngredients === 1">
          <b-form-input v-model="ingredientName" :placeholder="`${numOfIngredients}. Please enter here your ingredients name...`" ></b-form-input>
        </template>
        <template v-else>
             <b-form-input v-model="ingredientName" :placeholder="`${numOfIngredients}.`" ></b-form-input>
        </template>
        <!-- Ingredient details -->
        <div class="ingredients-details-container">
          <b-row class="mt-3">
              <b-form-group class="amount" label="Amount:">
                <b-form-spinbutton id="amount-sb" v-model="amount" min="1" max="100"></b-form-spinbutton>
              </b-form-group>
              <b-form-group class="units" label="Units:">
                <b-form-select v-model="selected" >
                <b-form-select-option :value="null">Please select a unit measure</b-form-select-option>
                  <b-form-select-option value="Gram">Gram</b-form-select-option>
                  <b-form-select-option value="Kilogram">Kilogram</b-form-select-option>
                  <b-form-select-option value="Milliliter">Milliliter</b-form-select-option>
                  <b-form-select-option value="Liter">Liter</b-form-select-option>
                  <b-form-select-option value="Curt">Curt</b-form-select-option>
                  <b-form-select-option value="Teaspoon">Teaspoon</b-form-select-option>
                  <b-form-select-option value="Spoon">Spoon</b-form-select-option>
                  <b-form-select-option value="Cup">Cup</b-form-select-option>
                   </b-form-select>
              </b-form-group>
              <div class="ingredients-buttons-container">
                <b-icon 
                  variant="success" 
                  icon="plus" 
                  @click="AddIngredient" 
                  :style="{ fontSize: '24px' }" 
                  :disabled="isIngredientButtonDisabled"
                ></b-icon>
                <b-icon 
                  variant="danger" 
                  icon="dash" 
                  @click="RemoveIngredient" 
                  :style="{ fontSize: '24px' }"
                ></b-icon>
              </div>
          </b-row>
        </div>
      </b-form-group>


      <div class="buttons-container">
        <b-button type="submit" variant="success" @click="onSubmit">Create</b-button>
        <b-button type="reset" variant="warning" @click="onReset">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { addNewRecipe } from "../services/user.js";

export default {
  name: 'NewRecipe',
  data() {
    return {
      imageUrl: '', // Initialize imageUrl as empty string
      useUrlInput: false, // Flag to toggle between file upload and URL input
      show: true, // Flag to show or hide the form
      file1: null, // Holds the selected image file
      file2: null, // Additional file input (not used in this version)
      form: {
        name: '', // Recipe title
        checked: [], // Selected dietary options
      },
      servingAmount: 0, // Number of servings
      instructions: [], // Array of recipe instructions
      instruction: "", // Current instruction being added
      numOfInstructions: 1, // Number of instructions
      ingredients: [], // Array of recipe ingredients
      ingredientName: "", // Current ingredient name being added
      numOfIngredients: 1, // Number of ingredients
      amount: 0, // Amount of the ingredient
      time: '00:00', // Time required to make the recipe
      text: '', // Summary or description of the recipe
      selected: null, // Selected unit for ingredients
      showToast: false, // Flag to show toast messages
    }
  },
  computed: {
    isIngredientButtonDisabled() {
      // Disable ingredient button if any required field is empty
      return !this.ingredientName || !this.amount || !this.selected;
    },
    selectedFileOrUrl() {
      // Display the selected file name or URL based on input mode
      return this.useUrlInput ? this.imageUrl : (this.file1 ? this.file1.name : '');
    },
  },
  methods: {
    validateForm() {
    // Validate required fields in the form and return a list of missing fields
    const missingFields = [];

    if (!this.form.name) {
      missingFields.push('Title');
    }
    if (!this.time || this.time === '00:00') {
      missingFields.push('Time to make');
    }
    if (this.useUrlInput && !this.imageUrl) {
      missingFields.push('Image URL');
    } else if (!this.useUrlInput && !this.file1) {
      missingFields.push('Image File');
    }
    if (!this.text) {
      missingFields.push('Summary');
    }
    if (this.servingAmount <= 0) {
      missingFields.push('Serving Amount');
    }
    if (this.instructions.length === 0) {
      missingFields.push('Instructions');
    }
    if (this.ingredients.length === 0) {
      missingFields.push('Ingredients');
    }

    return missingFields;
  },
    timeAsFloat() {
    // Convert time to a float representing minutes
    const [minutes, seconds] = this.time.split(':').map(Number);
    return minutes + (seconds / 60);
  },
    AddInstruction() {
      // Add a new instruction to the list
      if (this.instruction) {
        this.instructions.push(this.instruction);
        this.numOfInstructions += 1;
        this.instruction = "";
        this.$root.toast("Instruction added!", "This instruction was added to your current recipe", "success");
      }
    },
    RemoveInstruction() {
      // Remove the last instruction from the list
      if(this.numOfInstructions > 0){
         this.instructions.pop();
         this.numOfInstructions -= 1;
      }
      else
      {
          this.$root.toast("Problem encountered during instruction removal ", "You don't have any instruction for this recipe", "danger");
      }
     
    },
    AddIngredient() {
      // Add a new ingredient to the list
      if (this.isIngredientButtonDisabled) {
        this.showToast = true;
        return;
      }
      if (this.ingredientName && this.amount && this.selected) {
        this.ingredients.push({ name: this.ingredientName, amount: this.amount, unit: this.selected });
        this.numOfIngredients += 1;
        this.ingredientName = "";
        this.amount = 0;
        this.selected = null;
        this.$root.toast("Ingredient added!", "This ingredient was added to your current recipe", "success");
 
      }
    },
    RemoveIngredient() {
      // Remove the last ingredient from the list
      if(this.numOfIngredients > 0){
        this.ingredients.pop();
        this.numOfIngredients -= 1;
      }
      else
      {
        this.$root.toast("Problem encountered during ingridient removal ", "You don't have any ingridient for this recipe", "danger");
      }
    },

    async onSubmit(event) {
      // Handle form submission
      event.preventDefault();

    // Validate form before submitting
    const missingFields = this.validateForm();
    if (missingFields.length > 0) {
      this.$root.toast(`Please fill out the following fields: ${missingFields.join(', ')}`," ");
      return;
    }
      const recipeDetails = {
        title: this.form.name,
        readyInMinutes: this.timeAsFloat(),
        image: this.useUrlInput ? this.imageUrl : (this.file1 ? this.imageUrl : ''), // Use URL if in URL mode, else use uploaded file URL
        aggregateLikes: 0,
        vegan: this.form.checked.includes('isVegan'),
        vegetarian: this.form.checked.includes('isVegetarian'),
        glutenFree: this.form.checked.includes('isGlutenFree'),
        extendedIngredients: this.ingredients,
        summary: this.text,
        analyzedInstructions: this.instructions,
        serving: this.servingAmount,
      };
      const response = await addNewRecipe(recipeDetails);
      if (response.data.status === 200 && response.data.success) {
        this.show = false; // Close the form window
        this.$emit('recipe-created');
      } else {
        alert('Failed to add the recipe. Please try again.');
      }
    },
    onReset(event) {
      // Reset form fields to their initial state
      if(event != null){
        event.preventDefault();
      }
      this.form = {
        name: '',
        checked: [],
      };
      this.file1 = null;
      this.file2 = null;
      this.instructions = [];
      this.numOfInstructions = 1;
      this.ingredients = [];
      this.servingAmount = 0;
      this.numOfIngredients = 1;
      this.ingredientName = '';
      this.amount = 0;
      this.time = '00:00';
      this.text = '';
      this.selected = null;
    },
    handleFileChange() {
      // Reset imageUrl when switching back to file upload mode
      this.imageUrl = '';
    },
    toggleInputMode() {
      // Toggle between file upload and URL input modes
      this.useUrlInput = !this.useUrlInput;
      if (this.useUrlInput) {
        this.file1 = null; // Reset file1 when switching to URL input mode
      }
    },
  }
}


</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap");

.recipe-form-container {
  max-width: 800px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.b-form-group,
.form-group,
.ingredients-container,
.instruction-container,
.buttons-container {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.instruction-container,
.ingredients-container {
  display: flex;
  align-items: center;
}

.instruction-container b-form-input,
.ingredients-container b-form-input {
  flex: 1;
  margin-right: 10px;
}

.ingredients-details-container {
  position: relative;
  display: inline-block;
}

.ingredients-buttons-container {
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.b-icon {
  cursor: pointer;
  margin-left: 10px;
  font-size: 24px;
}

.ingredients-buttons-container .b-icon {
  cursor: pointer;
  margin-left: 10px;
  font-size: 40px;
  display: inline-block;
  height: 50%;

}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .ingredients-container b-row {
    flex-direction: column;
  }

  .b-icon {
    margin-top: 10px;
  }
}
</style>
