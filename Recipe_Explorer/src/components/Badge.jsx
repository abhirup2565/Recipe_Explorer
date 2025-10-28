export default function Badge({ text, color = "yellow" }) {
  const colorMap = {
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  return (
    <span
      className={`${colorMap[color]} text-white px-3 py-1 rounded-full text-sm font-medium`}
    >
      {text}
    </span>
  );
}
