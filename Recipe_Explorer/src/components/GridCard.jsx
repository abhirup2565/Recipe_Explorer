import { Link } from "react-router-dom";

export default function GridCard({
  id,
  image,
  title,
  description,
  onClick,
  link,
}) {
  const Wrapper = link ? Link : "div";
  const wrapperProps = link
    ? { to: link }
    : { onClick, role: "button", tabIndex: 0 };

  return (
    <Wrapper {...wrapperProps}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
        {image && (
          <img
            src={image}
            alt={title}
            className="h-48 w-full object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
