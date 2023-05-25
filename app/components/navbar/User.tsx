import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from "../icons/UserIcon";

const User = () => {
  const { data: session } = useSession();
  const image = session?.user?.image;

  return (
    <div
      className={`relative hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full p-1 md:flex ${
        image ? "border-none" : "border border-pale-amber"
      }`}
    >
      {image ? <Image src={image} alt="avatar" fill /> : <UserIcon size={26} />}
    </div>
  );
};

export default User;
