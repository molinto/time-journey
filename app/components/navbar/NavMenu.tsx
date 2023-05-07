"use client";

import { signOut, useSession } from "next-auth/react";
import MenuItem from "./MenuItem";
import { useAppDispatch } from "../utils/reduxHooks";
import { open } from "../modals/modalSlice";

interface NavMenuProps {
  isOpen: boolean;
}

const NavMenu = ({ isOpen }: NavMenuProps) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const currentUser = session?.user;

  return (
    <div
      className={
        "flex-grow items-center overflow-hidden md:static md:flex md:bg-transparent" +
        (isOpen
          ? " absolute right-0 top-10 rounded-md bg-neutral-200 hover:rounded-md"
          : " hidden")
      }
    >
      <ul className="flex list-none flex-col md:flex-row md:items-center">
        <MenuItem title="Play" to="/game" />
        <MenuItem title="Rankings" to="/rankings" />
        {currentUser ? (
          <MenuItem
            title="Log Out"
            onClick={() => {
              signOut();
            }}
          />
        ) : (
          <MenuItem title="LogIn" onClick={() => dispatch(open("login"))} />
        )}
      </ul>
    </div>
  );
};

export default NavMenu;
