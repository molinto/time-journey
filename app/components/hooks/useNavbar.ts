import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useNavbar = () => {
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
  return { toggleIsOpen, isOpen, closeMenu };
};

export default useNavbar;
