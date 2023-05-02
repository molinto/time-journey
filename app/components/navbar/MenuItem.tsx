import { AppDispatch } from "@/app/store";
import { Payload } from "@prisma/client/runtime";
import { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import Link from "next/link";
import { Dispatch } from "react";
import { useAppDispatch } from "../utils/reduxHooks";
import { open } from "../modals/modalSlice";

interface MenuItemProps {
  title: string;
  onClick?: any;
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
