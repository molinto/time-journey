"use client";

import { useState } from "react";
import useLoginStore from "../hooks/useLoginStore";
import MenuIcon from "../icons/MenuIcon";
import MenuItem from "./MenuItem";
import User from "./User";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const loginModal = useLoginStore();
  const currentUser = false;

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
          "flex-grow items-center overflow-hidden md:static md:flex md:bg-transparent" +
          (isOpen
            ? " absolute right-0 top-10 rounded-md bg-neutral-200 hover:rounded-md"
            : " hidden")
        }
      >
        <ul className="flex list-none flex-col md:flex-row md:items-center">
          <MenuItem title="Play" />
          <MenuItem title="Rankings" />
          {currentUser ? (
            <MenuItem title="Log Out" onClick={() => {}} border />
          ) : (
            <MenuItem title="LogIn" onClick={loginModal.onOpen} border />
          )}
        </ul>
        <User />
      </div>
    </div>
  );
};

export default NavMenu;
