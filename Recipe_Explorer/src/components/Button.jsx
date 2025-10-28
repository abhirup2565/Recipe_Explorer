export default function Button({ text, onClick = () => {}, color = "blue", variant = "outline" }) {
  const colorMap = {
    blue: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    yellow: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
    gray: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
    red: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  };

  const filledMap = {
    blue: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
    yellow: "bg-yellow-500 text-white hover:bg-yellow-600 border-transparent",
    gray: "bg-gray-800 text-white hover:bg-gray-900 border-transparent",
    red: "bg-red-500 text-white hover:bg-red-600 border-transparent",
  };

  const base = "px-6 py-2 rounded-lg border-2 transition font-medium";

  const colorClasses = variant === "filled" ? filledMap[color] : colorMap[color];
  return (
    <button onClick={onClick} className={`${base} ${colorClasses}`}>
      {text}
    </button>
  );
}
