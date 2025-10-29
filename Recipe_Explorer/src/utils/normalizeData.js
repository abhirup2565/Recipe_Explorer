/**
 * Normalizes raw API data into a consistent structure for DisplayGrid
 */
export const normalizeData = (data, type, setDisplayItem) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    switch (type) {
      case "allCategory":
        return {
          id: item.idCategory,
          image: item.strCategoryThumb,
          title: item.strCategory,
          description: item.strCategoryDescription,
          onClick: () =>
            setDisplayItem?.({ type: "category", value: item.strCategory }),
        };

      case "category":
        return {
          id: item.idMeal,
          image: item.strMealThumb,
          title: item.strMeal,
          link: `/dish/${item.idMeal}`,
        };

      case "Ingredients":
        return {
          id: item.idIngredient,
          image: item.strThumb || "",
          title: item.strIngredient,
        };

      case "cuisine":
        return {
          id: item.idMeal,
          image: item.strMealThumb,
          title: item.strMeal,
          link: `/dish/${item.idMeal}`,
        };

      default:
        return {};
    }
  });
};