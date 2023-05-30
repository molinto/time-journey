import { AppDispatch } from "@/app/store";
import Link from "next/link";

interface MenuItemProps {
  title: string;
  onClick?: (() => void) | (() => AppDispatch);
  to?: string;
}

const MenuItem = ({ title, onClick, to }: MenuItemProps) => {
  return (
    <li className="">
      <Link
        onClick={onClick}
        href={to ? to : ""}
        className="block w-full px-8  py-3 underline-offset-[5px] transition-colors duration-200 hover:bg-dark-sky-light hover:text-amber-darken md:hover:bg-dark-sky md:hover:underline "
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
