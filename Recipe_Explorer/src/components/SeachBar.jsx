import { useEffect, useState, useMemo, useRef } from "react";
import { debounce } from "../utils/debounce";
import { searchMeals } from "../utils/searchMeals";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced version of the search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        if (!value.trim()) return setResults([]);
        setLoading(true);
        const res = await searchMeals(value);
        setResults(res);
        setLoading(false);
        setOpen(true); 
      }, 600),
    []
  );

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-md w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search dishes or ingredients..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 focus:outline-none"
        />
        <button
          type="button"
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {/* Dropdown Results */}
      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-md max-h-64 overflow-y-auto">
          {results.map((meal) => (
            <li
              key={meal.idMeal}
              className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-gray-800"
              onClick={() => {
                onSelect(meal.idMeal);
                 setOpen(false);}}
            >
              {meal.strMeal}
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {open && !loading && query && results.length === 0 && (
        <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-md p-3 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}
