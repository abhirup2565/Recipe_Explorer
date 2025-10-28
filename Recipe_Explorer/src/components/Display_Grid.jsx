import { useEffect, useState } from "react";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";
import { Link } from "react-router-dom";

export default function DisplayGrid({ displayItem = { type: "allCategory", value: "allCategory" }, setDisplayItem }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null);
        let res;

        switch (displayItem.type) {
          case "allCategory":
            res = await fetchSafe.get(API.CATEGORIES);
            setData(res.data.categories);
            break;

          case "category":
            res = await fetchSafe.get(API.Filter_Category(displayItem.value));
            setData(res.data.meals);
            break;

          case "cuisine":
            res = await fetchSafe.get(API.MEALS_BY_CUISINE(displayItem.value));
            setData(res.data.meals);
            break;

          default:
            throw new Error("Invalid display type");
        }
      } catch (err) {
        setError(err.message);
      }
      finally
      {
        setLoading(false)
      }
    };

    fetchData();
  }, [displayItem]); // Refetch when cuisine changes

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 capitalize">
        {displayItem === "allCategory" ? "All Categories" : `${displayItem.value}`}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
        {displayItem.type === "allCategory"
          ? data.map((item) => (
            <button onClick = {() => setDisplayItem({ type: "category", value: item.strCategory })}>
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
            </button>
            ))
          : data.map((item) => (
            <Link to={`/dish/${item.idMeal}`}>
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
              </Link>
            ))}
      </div>
    </>
  );
}
