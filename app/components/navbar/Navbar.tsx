"use client";

import { useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import User from "./User";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed z-10 flex h-16 w-full items-center justify-between border-b bg-slate-100 px-5 shadow-sm">
      <Logo />
      <div className="relative flex items-center justify-between px-4">
        <button
          className="block cursor-pointer md:hidden"
          type="button"
          onClick={toggleIsOpen}
        >
          <MenuIcon />
        </button>

        <NavMenu isOpen={isOpen} />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
