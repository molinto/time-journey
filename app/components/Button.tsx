interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  icon?: React.FC;
  type: "button" | "submit";
}
const Button = ({
  label,
  onClick,
  disabled,
  outline,
  icon: Icon,
  type,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative  flex w-full items-center justify-center rounded-lg border p-3 transition-all hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70 
      ${outline ? "border-black bg-transparent" : "bg-green-700 text-white"}
      `}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default Button;
