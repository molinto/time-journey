"use client";

import { useEffect, useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import User from "./User";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const path = usePathname();

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [path]);

  return (
    <nav className="fixed z-10 flex h-12 w-full items-center justify-between bg-dark-sky px-2 text-amber-50 shadow-sm md:h-16">
      <Logo />
      <div className="relative flex items-center justify-between px-4">
        <button
          // ref={buttonRef}
          className="block cursor-pointer md:hidden"
          type="button"
          onClick={toggleIsOpen}
        >
          <MenuIcon />
        </button>

        <NavMenu isOpen={isOpen} closeMenu={closeMenu} />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
