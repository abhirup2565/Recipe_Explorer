import { useEffect, useState } from "react";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";
import createStorageManager from "../utils/storageFactory";
import { extractIngredients } from "../utils/extractIngredients";
import Button from "../components/Button";
import Badge from "../components/Badge";
import BackButton from "../components/BackButton";

export default function DishDetails({ mealId }) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize storage managers
  const cartManager = createStorageManager("cart");
  const favoriteManager = createStorageManager("favorites");

  // Fetch meal details
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

  // Extract ingredients
  const ingredients = extractIngredients(meal);

  // Add handlers
  const handleAddToFavorites = (meal) => {
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
      <BackButton/>
      {/* Top Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge text={meal.strCategory} color="yellow" />
        <Badge text={meal.strArea} color="gray" variant="filled" />
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
            <Button text="❤️ Add to Favorites" onClick={()=>handleAddToFavorites(meal)} color="gray" variant="filled" />
          </div>

          {/* Video Link */}
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button text="🎥 Watch Tutorial" color="red" variant="filled" />
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
              <Button
                text="Add to Cart"
                color="yellow"
                variant="filled"
                onClick={() => handleAddToCart(item)}
              />
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
        <Button
          text="❤️ Add to Favorites"
          color="gray"
          variant="filled"
          onClick={()=>handleAddToFavorites(meal)}
        />
        <Button
          text="🛒 Add All Ingredients to Cart"
          color="yellow"
          variant="filled"
          onClick={handleAddAllToCart}
        />
      </div>
    </div>
  );
}
