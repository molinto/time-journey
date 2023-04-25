import Logo from "./Logo";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <nav className="fixed flex h-16 w-full items-center justify-between border-b bg-slate-100 px-5 shadow-sm">
      <Logo />
      <NavMenu />
    </nav>
  );
};

export default Navbar;
