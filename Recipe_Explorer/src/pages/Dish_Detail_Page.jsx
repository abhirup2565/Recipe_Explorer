import { useEffect, useState } from "react";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";
import storageFactory from "../utils/storageFactory"; // import the reusable factory

export default function DishDetails({ mealId }) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize storage managers
  const cartManager = storageFactory("cart");
  const favoriteManager = storageFactory("favorites");

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true);
      try {
        setError(null);
        const res = await fetchSafe.get(API.MEAL_DETAILS(mealId));
        setMeal(res.data.meals[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [mealId]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!meal) return null;

  // Extract ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        id: `${meal.idMeal}-${i}`, // unique id for cart item
        name: ingredient,
        image: meal.strMealThumb,
        description: `${measure} of ${ingredient}`,
      });
    }
  }

  // Add handlers
  const handleAddToFavorites = () => {
    favoriteManager.add({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
    });
    alert(`${meal.strMeal} added to favorites!`);
  };

  const handleAddToCart = (item) => {
    cartManager.add(item);
    alert(`${item.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    cartManager.add(ingredients);
    alert("All ingredients added to cart!");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Top Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {meal.strCategory}
        </span>
        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
          {meal.strArea}
        </span>
      </div>

      {/* Image & Title */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-2xl shadow-lg w-full lg:w-1/2 object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>

          {/* Add to Favorites */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={handleAddToFavorites}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              ❤️ Add to Favorites
            </button>
          </div>

          {/* Video Link */}
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              🎥 Watch Tutorial
            </a>
          )}
        </div>
      </div>

      {/* Ingredients */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">🧂 Ingredients</h2>
        <ul className="space-y-2">
          {ingredients.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-50 border rounded-lg p-3"
            >
              <span className="font-medium">{item.description}</span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">👨‍🍳 Instructions</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {meal.strInstructions}
        </p>
      </section>

      {/* Bottom Actions */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={handleAddToFavorites}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          ❤️ Add to Favorites
        </button>
        <button
          onClick={handleAddAllToCart}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          🛒 Add All Ingredients to Cart
        </button>
      </div>
    </div>
  );
}
