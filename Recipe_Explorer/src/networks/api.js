const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const API = {
  LIST_CUISINES: `${BASE_URL}/list.php?a=list`,
  CATEGORIES: `${BASE_URL}/categories.php`,
  MEALS_BY_CUISINE: (cuisine) => `${BASE_URL}/filter.php?a=${cuisine}`,
};
