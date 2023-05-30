import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const useNavbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const path = usePathname();

  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside(menuRef, closeMenu);

  useEffect(() => {
    closeMenu();
  }, [path]);
  return { openMenu, isOpen, closeMenu, menuRef };
};

export default useNavbar;
