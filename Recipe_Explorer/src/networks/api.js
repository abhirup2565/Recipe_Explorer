const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const API = {
  LIST_CUISINES: `${BASE_URL}/list.php?a=list`,
  LIST_INGREDIENTS: `${BASE_URL}/list.php?i=list`,
  CATEGORIES: `${BASE_URL}/categories.php`,
  Filter_Category: (category) => `${BASE_URL}/filter.php?c=${category}`,
  MEALS_BY_CUISINE: (cuisine) => `${BASE_URL}/filter.php?a=${cuisine}`,
  MEAL_DETAILS: (id) => `${BASE_URL}/lookup.php?i=${id}`,
  RANDOM_MEAL: `${BASE_URL}/random.php`
};
