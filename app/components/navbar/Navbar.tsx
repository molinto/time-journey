"use client";

import MenuIcon from "../icons/MenuIcon";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import User from "./User";
import useNavbar from "./useNavbar";
import CloseIcon from "../icons/CloseIcon";

const Navbar = () => {
  const { openMenu, isOpen, closeMenu, menuRef } = useNavbar();

  return (
    <nav className="fixed z-10 flex h-12 w-full items-center justify-between bg-dark-sky px-2 text-amber shadow-sm md:h-16">
      <Logo />
      {/* <button onClick={() => axios.get("/api/uploadMany")}>UPLOAD MANY</button> */}
      <div
        className="relative flex items-center justify-between px-4"
        ref={menuRef}
      >
        {!isOpen ? (
          <button
            className="block cursor-pointer md:hidden"
            type="button"
            onClick={openMenu}
          >
            <MenuIcon />
          </button>
        ) : (
          <button
            className="block cursor-pointer md:hidden"
            type="button"
            onClick={closeMenu}
          >
            <CloseIcon />
          </button>
        )}
        <NavMenu isOpen={isOpen} closeMenu={closeMenu} />
        <div className="hidden md:block">
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
