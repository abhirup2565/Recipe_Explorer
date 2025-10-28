export default function Button({
  text,
  onClick = () => {},
  color = "blue",
  variant = "outline", // outline or filled
}) {
  const base =
    "px-6 py-2 rounded-lg font-medium transition border-2 focus:outline-none";
  const variants = {
    outline: `border-${color}-600 text-${color}-600 hover:bg-${color}-600 hover:text-white`,
    filled: `bg-${color}-600 text-white hover:bg-${color}-700`,
  };

  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
}
