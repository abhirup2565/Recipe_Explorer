const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const API = {
  LIST_CUISINES: `${BASE_URL}/list.php?a=list`,
  LIST_INGREDIENTS: `${BASE_URL}/list.php?i=list`,
  CATEGORIES: `${BASE_URL}/categories.php`,
  Filter_Category: (category) => `${BASE_URL}/filter.php?c=${category}`,
  Filter_Ingredient: (ingredient) => `${BASE_URL}/filter.php?i=${ingredient}`,
  MEALS_BY_CUISINE: (cuisine) => `${BASE_URL}/filter.php?a=${cuisine}`,
  MEAL_DETAILS: (id) => `${BASE_URL}/lookup.php?i=${id}`,
  SEARCH_DISH: (dish) => `${BASE_URL}/search.php?s=${dish}`,
  RANDOM_MEAL: `${BASE_URL}/random.php`
};
