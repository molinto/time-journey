"use client";

import { useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import MenuItem from "./MenuItem";
import UserGroup from "./UserGroup";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center justify-between px-4">
      <button
        className="block cursor-pointer md:hidden"
        type="button"
        onClick={toggleIsOpen}
      >
        <MenuIcon />
      </button>
      <div
        className={
          "flex-grow items-center md:static md:flex md:bg-transparent" +
          (isOpen
            ? " absolute right-0 top-10 gap-3 rounded-md bg-gray-200 p-3"
            : " hidden")
        }
      >
        <ul className="flex list-none flex-col   gap-3 md:flex-row md:items-center">
          <MenuItem title="Play" />
          <MenuItem title="Rankings" />

          <li>
            <UserGroup />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
