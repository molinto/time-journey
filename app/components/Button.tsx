/* eslint-disable no-unused-vars */
import React from "react";

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
      className={`relative flex w-full items-center justify-center rounded-lg  p-3 transition-all disabled:cursor-not-allowed disabled:opacity-70 lg:max-w-lg
      ${
        outline
          ? "border border-silver bg-transparent hover:bg-honeydew "
          : "bg-fern-green text-white hover:brightness-90 "
      }
      `}
    >
      <div className="absolute left-3">{Icon && <Icon />}</div>
      {label}
    </button>
  );
};

export default Button;
