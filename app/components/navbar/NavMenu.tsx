"use client";

import { signOut, useSession } from "next-auth/react";
import MenuItem from "./MenuItem";
import { useAppDispatch } from "../utils/reduxHooks";
import { open } from "../modals/modalSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

interface NavMenuProps {
  isOpen: boolean;
}

const NavMenu = ({ isOpen }: NavMenuProps) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const router = useRouter();
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

        {/* <button onClick={() => axios.get("/api/uploadMany")}>
          UPLOAD MANY
        </button> */}
        {currentUser ? (
          <>
            <MenuItem title="Upload" to="/upload" />
            <MenuItem
              title="Log Out"
              onClick={() => {
                signOut();
                router.push("/");
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
