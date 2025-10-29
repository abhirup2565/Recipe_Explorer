import { useEffect, useState } from "react";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";
import GridCard from "./GridCard";
import { normalizeData } from "../utils/normalizeData";

export default function DisplayGrid({
  displayItem = { type: "allCategory", value: "allCategory" },
  setDisplayItem,
}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

          case "Ingredients":
            res = await fetchSafe.get(API.LIST_INGREDIENTS);
            setData(res.data.meals);
            break;

          default:
            throw new Error("Invalid display type");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [displayItem]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading) return <p className="text-center">Loading...</p>;

  const normalizedData = normalizeData(data, displayItem.type, setDisplayItem);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 capitalize">
        {displayItem.value}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
        {normalizedData.map((item) => (
          <GridCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
