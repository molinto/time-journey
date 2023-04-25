import Image from "next/image";
import WatchLogo from "../../../public/rotated.png";

const Logo = () => {
  return (
    <span className="flex">
      <div className="w-24"></div>
      <Image
        src={WatchLogo}
        width={80}
        height={80}
        alt="Logo"
        className="fixed top-1 hidden md:block "
      />
      <h1 className="font-logo text-4xl">TimeGuessr</h1>
    </span>
  );
};

export default Logo;
