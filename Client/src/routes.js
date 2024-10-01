import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeID",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About"),
  },
  {
    path: "/MyRecipes",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipes"),
  },
  {
    path: "/MyFavoriteRecipes",
    name: "MyFavoriteRecipes",
    component: () => import("./pages/MyFavoriteRecipes"),
  },
  {
    path: "/MyFamilyRecipes",
    name: "MyFamilyRecipes",
    component: () => import("./pages/MyFamilyRecipes"),
  },
  // {
  //   path: "/NewRecipe",
  //   name: "NewRecipe",
  //   component: () => import("./pages/NewRecipe"),
  // },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
