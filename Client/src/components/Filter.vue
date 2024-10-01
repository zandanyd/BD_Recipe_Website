<template>
  <!-- Filters sidebar -->
  <b-sidebar id="filters-sidebar" title="Filters" shadow>
    <!-- Dropdown for Cuisines -->
    <b-col>
      <b-dropdown id="cuisine-filter" text="Cuisines" class="mb-3">
        <div class="cuisines-dropdown-options">
          <b-form-checkbox-group v-model="selectedFilters.cuisines" stacked>
            <b-form-checkbox v-for="(cuisine) in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</b-form-checkbox>
          </b-form-checkbox-group>
        </div>
      </b-dropdown>
    </b-col>
    <!-- Dropdown for Diets -->
    <b-col>
      <div class="diets-dropdown">
        <b-dropdown id="diet-filter" text="Diets" class="mb-3">
          <b-form-checkbox-group v-model="selectedFilters.diets" stacked>
            <b-form-checkbox v-for="(diet, index) in diets" :key="index" :value="diet">{{ diet }}</b-form-checkbox>
          </b-form-checkbox-group>
        </b-dropdown>
      </div>
    </b-col>
    <!-- Dropdown for Intolerances -->
    <b-col>
      <div class="intolerances-dropdown">
        <b-dropdown id="intolerance-filter" text="Intolerances" class="mb-3">
          <b-form-checkbox-group v-model="selectedFilters.intolerances" stacked>
            <b-form-checkbox v-for="(intolerance, index) in intolerances" :key="index" :value="intolerance">{{ intolerance }}</b-form-checkbox>
          </b-form-checkbox-group>
        </b-dropdown>
      </div>
    </b-col>
  </b-sidebar>
</template>

<script>
import cuisines from '../assets/cuisines.json';
import diets from '../assets/diets.json';
import intolerances from '../assets/intolerances.json';

export default {
  props: {
    selectedFilters: {
      type: Object,
      default: () => ({
        cuisines: [],  // Array to hold selected cuisines
        diets: [],     // Array to hold selected diets
        intolerances: [] // Array to hold selected intolerances
      })
    }
  },
  data() {
    return {
      cuisines: cuisines,         // Array of available cuisines
      diets: diets,               // Array of available diets
      intolerances: intolerances // Array of available intolerances
    };
  },
  watch: {
    selectedFilters: {
      // Watcher to emit event when selectedFilters changes
      handler(newVal) {
        this.$emit('update:selectedFilters', newVal);
      },
      deep: true // Deep watch for nested changes
    }
  },
  methods: {
    resetFilters() {
      // Method to reset all selected filters to default (empty arrays)
      this.$emit('update:selectedFilters', {
        cuisines: [],
        diets: [],
        intolerances: []
      });
    }
  }
};
</script>

<style scoped>
.filters-sidebar-container {
  display: flex;
  align-items: flex-start; /* Adjust alignment as needed */
}

.filters-sidebar-content {
  width: 100%; /* Ensure content takes full width of sidebar */
}

.filters-sidebar-content > .mb-3 {
  margin-bottom: 1rem; /* Adjust spacing between dropdowns */
}

.cuisines-dropdown,
.diets-dropdown,
.intolerances-dropdown {
  width: 100%; /* Make each dropdown container full width */
  max-width: 100%; /* Ensure they take up full available width */
  padding-right: 15px; /* Compensate for padding */
}

.cuisines-dropdown-options {
  max-height: 300px; /* Adjust height as needed */
  overflow-y: auto;
}
</style>