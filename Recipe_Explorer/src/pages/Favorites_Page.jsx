import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import createStorageManager from "../utils/storageFactory";
import Button from "../components/Button";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Initialize favorites storage manager
  const favoriteManager = createStorageManager("favorites");

  // Load favorites on mount
  useEffect(() => {
    setFavorites(favoriteManager.get());
  }, []);

  // Remove favorite handler
  const handleRemove = (id) => {
    const updated = favoriteManager.remove(id);
    setFavorites(updated);
  };

  // Empty state
  if (!favorites || favorites.length === 0) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center text-center text-gray-600">
        <p className="text-lg font-medium">No favorites added yet 💔</p>
      </div>
    );
  }

  // Display favorites grid
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-[100vh]">
      <h1 className="text-2xl font-bold text-center mb-6">Your Favorites ❤️</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Delete Icon */}
            <button
              onClick={() => handleRemove(item.id)}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
            >
              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>

            {/* Link to Dish Details */}
            <Link to={`/dish/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {item.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button text="Clear All" color="red" variant="filled" onClick={()=> {favoriteManager.clear()
          setFavorites([])
        }}/>
      </div>
    </div>
  );
}
