import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";

export async function searchMeals(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const ingredients = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    //  Multi-ingredient search (intersection)
    if (ingredients.length > 1) {
      const ingredientPromises = ingredients.map((ing) =>
        fetchSafe
          .get(API.Filter_Ingredient(encodeURIComponent(ing)))
          .then((res) => res.data.meals || [])
      );

      const allResults = await Promise.all(ingredientPromises);

      const intersection = allResults.reduce((acc, curr) => {
        if (acc.length === 0) return curr;
        return acc.filter((meal) =>
          curr.some((m) => m.idMeal === meal.idMeal)
        );
      }, []);

      return intersection || [];
    }

    //  Single term — Dish first
    const dishRes = await fetchSafe.get(API.SEARCH_DISH(encodeURIComponent(trimmed)));
    if (dishRes.data?.meals) return dishRes.data.meals;

    // Fallback to ingredient
    const ingredientRes = await fetchSafe.get(API.Filter_Ingredient(encodeURIComponent(trimmed)));
    return ingredientRes.data?.meals || [];
  } catch (err) {
    console.error("Search failed:", err.message);
    return [];
  }
}
