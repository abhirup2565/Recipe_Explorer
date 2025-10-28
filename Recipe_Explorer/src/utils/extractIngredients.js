export function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        id: `${meal.idMeal}-${i}`,
        name: ingredient,
        image: meal.strMealThumb,
        description: `${measure} of ${ingredient}`,
      });
    }
  }
  return ingredients;
}
