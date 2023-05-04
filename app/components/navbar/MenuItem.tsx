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
        className="block w-full p-3 hover:bg-slate-300 md:hover:bg-inherit md:hover:underline"
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
