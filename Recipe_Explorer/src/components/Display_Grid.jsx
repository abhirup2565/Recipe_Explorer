import { useEffect, useState } from "react";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";

export default function DisplayGrid({ displayItem = "category" }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        let res;

        if (displayItem === "category") {
          // Default grid: all categories
          res = await fetchSafe.get(API.CATEGORIES);
          setData(res.data.categories);
        } else {
          // Cuisine-specific meals
          res = await fetchSafe.get(API.MEALS_BY_CUISINE(displayItem));
          setData(res.data.meals);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [displayItem]); // Refetch when cuisine changes

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!data.length) return <p className="text-center">Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 capitalize">
        {displayItem === "category" ? "All Categories" : `${displayItem} Cuisine`}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
        {displayItem === "category"
          ? data.map((item) => (
              <div
                key={item.idCategory}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={item.strCategoryThumb}
                  alt={item.strCategory}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.strCategory}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.strCategoryDescription}
                  </p>
                </div>
              </div>
            ))
          : data.map((item) => (
              <div
                key={item.idMeal}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.strMeal}</h3>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}
