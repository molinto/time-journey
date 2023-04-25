import Link from "next/link";

interface MenuItemProps {
  title: string;
}

const MenuItem = ({ title }: MenuItemProps) => {
  return (
    <li>
      <Link href={""}>{title}</Link>
    </li>
  );
};

export default MenuItem;
