import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from "../icons/UserIcon";

const User = () => {
  const { data: session } = useSession();
  const image = session?.user?.image;

  return (
    <div className="relative  hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-600 p-1 md:flex">
      {image ? <Image src={image} alt="avatar" fill /> : <UserIcon size={26} />}
    </div>
  );
};

export default User;
