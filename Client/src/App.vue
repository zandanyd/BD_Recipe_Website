<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark" class="bg-green">
        <b-navbar-brand to="/" exact class="navbar-logo">
          <img src="data:image/png;base64,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">BD-Recipes</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mx-auto">
            <b-nav-item :to="{ name: 'main' }" class="main-page">Main Page <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
            </svg></b-nav-item>
            <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
            <b-nav-form>
              <b-nav-item :to="{ name: 'search'}" size="sm" @click="handleSearch">search <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg></b-nav-item>
            </b-nav-form>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <span v-if="!$root.store.username" class="nav-not-connected">
              <h6 style="color: #fff;">Hello Guest:</h6>
              <b-nav-item :to="{ name: 'register' }" style="padding-right: 4%">Register</b-nav-item> 
              <b-nav-item :to="{ name: 'login' }" style="padding-right: 4%">Login</b-nav-item>
            </span>
            <span v-else class="nav-connected">
              <span class="greeting">Hello {{ $root.store.username }} :</span>
              <b-nav-item-dropdown text="My Zone" right>
                <router-link :to="{ name: 'MyFavoriteRecipes' }" class="dropdown-item">My Favorite Recipes <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg></router-link>
                <router-link :to="{ name: 'MyRecipes' }" class="dropdown-item">My Recipes</router-link>
                <router-link :to="{ name: 'MyFamilyRecipes' }" class="dropdown-item">My Family Recipes <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
</svg></router-link>
              </b-nav-item-dropdown>
              <b-nav-item @click="showNewRecipeModal">Add a new Recipe<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg></b-nav-item>
              <b-nav-item @click="Logout">Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg></b-nav-item>
            </span>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-modal id="new-recipe-modal" title="Create a New Recipe" hide-footer>
      <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
        <new-recipe />
      </div>    
    </b-modal>
    <router-view />   
  </div>
</template>

<script>
import NewRecipe from "./components/NewRecipe";
import { computed } from 'vue';
import { Logout } from "./services/auth.js";

export default {
  components: { NewRecipe },
  name: "App",
  data() {
    return {
      searchQuery: ''
    };
  },
  comments:{
    NewRecipe
  },
  methods: {
    
    showNewRecipeModal() {
      this.$bvModal.show('new-recipe-modal');
    },
    Logout() {
      this.$root.store.logout();
      Logout();
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    handleSearch() {
      if (!this.$root.store.username) {
        // Show toast message
        this.$bvToast.toast('You must be logged in to search!', {
          title: 'Search Not Available',
          variant: 'warning',
          solid: true
        });
      } else {
        // Proceed with search action
        this.$router.push({ name: 'search' });
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');

/* Apply background to html and body to cover the entire viewport */
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  background-size: cover;
  background-color: #9bbcad ;
  background-image: url("@/assets/b1.jpg");

}

/* Main app container */
#app {
  font-family: Comfortaa;
  font-size: 10pt;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Ensure router-view fills the remaining space */
#app .router-view {
  flex: 1;
}

/* Navbar custom styles */
.b-navbar-nav {
  background-color: rgb(0, 0, 0);
}

.main-page {
  font-weight: bold;
  
}

/* Center the navbar items */
.b-navbar-nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-connected {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-not-connected {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#nav a.router-link-exact-active {
  color: #9bbcad;
}

.greeting {
  flex: right;
  color: white;
}

#new-recipe-modal .modal-header {
  background-color: #9bbcad;
}
#brand img {
  max-height: 40px; /* Maximum height */
  width: 100%; /* Maintain aspect ratio */
  object-fit: contain; /* Ensure image fits within given dimensions without stretching */
  display: block;
  margin: 0 auto;
}
/* Add this to your existing styles */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#app .navbar-logo {
  transition: transform 0.6s ease;
  display: inline-block; /* Ensure the logo stays inline */
}

#app .navbar-logo:hover {
  animation: rotate 0.6s linear;
}
</style>
