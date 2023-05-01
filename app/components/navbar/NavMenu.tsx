"use client";

import { signOut, useSession } from "next-auth/react";
import useLoginStore from "../hooks/useLoginStore";
import MenuItem from "./MenuItem";

interface NavMenuProps {
  isOpen: boolean;
}

const NavMenu = ({ isOpen }: NavMenuProps) => {
  const loginModal = useLoginStore();
  const { data: session } = useSession();
  const currentUser = session?.user;
  console.log(currentUser);

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
        <MenuItem title="Play" />
        <MenuItem title="Rankings" />
        {currentUser ? (
          <MenuItem
            title="Log Out"
            onClick={() => {
              signOut();
            }}
          />
        ) : (
          <MenuItem title="LogIn" onClick={loginModal.onOpen} />
        )}
      </ul>
    </div>
  );
};

export default NavMenu;
