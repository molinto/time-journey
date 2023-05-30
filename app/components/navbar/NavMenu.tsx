"use client";

import { signOut, useSession } from "next-auth/react";
import MenuItem from "./MenuItem";
import { useAppDispatch } from "../utils/reduxHooks";
import { open } from "../modals/modalSlice";

interface NavMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const NavMenu = ({ isOpen }: NavMenuProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSession();

  return (
    <div
      className={
        "flex-grow items-center overflow-hidden md:static md:flex md:bg-transparent" +
        (isOpen
          ? " absolute right-0 top-10  rounded-md bg-dark-sky hover:rounded-md"
          : " hidden")
      }
    >
      <ul className="flex list-none flex-col py-2 md:flex-row md:items-center lg:gap-5 lg:px-5">
        <MenuItem title="Play" to="/game" />
        <MenuItem title="Rankings" to="/rankings" />
        {status === "authenticated" ? (
          <>
            <MenuItem title="Upload" to="/upload" />
            <MenuItem
              title="Log Out"
              onClick={() => {
                signOut({ callbackUrl: "https://time-journey.vercel.app/" });
              }}
            />
          </>
        ) : (
          <MenuItem title="LogIn" onClick={() => dispatch(open("login"))} />
        )}
      </ul>
    </div>
  );
};

export default NavMenu;
