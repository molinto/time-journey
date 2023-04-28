import Link from "next/link";

interface MenuItemProps {
  title: string;
  onClick?: () => void;
}

const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <li>
      <Link
        onClick={onClick}
        href={""}
        className="block w-full p-3 hover:bg-slate-300 md:hover:bg-inherit md:hover:underline"
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
