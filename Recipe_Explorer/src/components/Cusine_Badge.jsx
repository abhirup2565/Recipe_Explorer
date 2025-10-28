export default function CuisineBadge() {
  const cuisines = ["Italian", "Indian", "Chinese", "Mexican", "Thai", "Japanese", "Greek"];

  return (
    <div className="flex overflow-x-auto gap-3 py-4 px-4 scrollbar-hide">
      {cuisines.map((cuisine) => (
        <span
          key={cuisine}
          className="flex-shrink-0 bg-yellow-300 text-gray-800 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-yellow-400 transition"
        >
          {cuisine}
        </span>
      ))}
    </div>
  );
}