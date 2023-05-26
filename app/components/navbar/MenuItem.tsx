import { AppDispatch } from "@/app/store";
import Link from "next/link";

interface MenuItemProps {
  title: string;
  onClick?: (() => void) | (() => AppDispatch);
  to?: string;
}

const MenuItem = ({ title, onClick, to }: MenuItemProps) => {
  return (
    <li>
      <Link
        onClick={onClick}
        href={to ? to : ""}
        className="block w-full p-3 underline-offset-[5px] transition-colors duration-300 md:hover:text-amber-darken md:hover:underline "
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
