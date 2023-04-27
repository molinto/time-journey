import Link from "next/link";

interface MenuItemProps {
  title: string;
  onClick?: () => void;
  border?: boolean;
}

const MenuItem = ({ title, onClick, border }: MenuItemProps) => {
  return (
    <li>
      <Link
        onClick={onClick}
        href={""}
        className={`block w-full p-3 hover:bg-slate-300 md:hover:bg-inherit md:hover:underline ${
          border ? "border-t border-black md:border-l md:border-t-0" : ""
        }`}
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
