import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton({ text = "← Back", color = "gray", variant = "outline", steps = -1 }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(steps);
  };

  return (
    <Button
      text={text}
      onClick={handleBack}
      color={color}
      variant={variant}
    />
  );
}
