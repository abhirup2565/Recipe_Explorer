import { useEffect, useState } from "react";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";

export default function CuisineDropdown({ selectedCuisine, onSelectCuisine }) {
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCuisines = async () => {
      setLoading(true)
      try {
        setError(null);
        const res = await fetchSafe.get(API.LIST_CUISINES);
        console.log("Cuisine API response:", res);
        setCuisines(res.data.meals);
      } catch (err) {
        setError(err.message);
      }
      finally{
        setLoading(false)
      }
    };

    loadCuisines();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading) return <p className="text-center">Loading cuisines...</p>;

  return (
    <div className="flex justify-center my-6">
      <select
        value={selectedCuisine}
        onChange={(e) => onSelectCuisine(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-white"
      >
        <option value="category">All Cuisine</option>
        {cuisines.map((item) => (
          <option key={item.strArea} value={item.strArea}>
            {item.strArea}
          </option>
        ))}
      </select>
    </div>
  );
}
