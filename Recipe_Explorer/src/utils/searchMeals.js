// utils/searchMeals.js

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
};

export async function searchMeals(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const ingredients = trimmed.split(",").map((s) => s.trim()).filter(Boolean);

  try {
    if (ingredients.length > 1) {
      // 🍳 Multi-ingredient search (intersection)
      const ingredientPromises = ingredients.map((ing) =>
        fetchJSON(`${API_BASE}/filter.php?i=${encodeURIComponent(ing)}`)
          .then((data) => data.meals || [])
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

    // 🔍 Single term — Dish first
    const dishRes = await fetchJSON(`${API_BASE}/search.php?s=${encodeURIComponent(trimmed)}`);
    if (dishRes.meals) return dishRes.meals;

    // 🥦 Fallback to ingredient
    const ingredientRes = await fetchJSON(`${API_BASE}/filter.php?i=${encodeURIComponent(trimmed)}`);
    return ingredientRes.meals || [];
  } catch (err) {
    console.error("Search failed:", err);
    return [];
  }
}
