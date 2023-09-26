import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex">
      <h1 className="lg pl-5 font-logo text-3xl md:text-4xl">
        Manx Time Journey
      </h1>
    </Link>
  );
};

export default Logo;
