import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from "../icons/UserIcon";

const User = () => {
  const { data: session } = useSession();
  const image = session?.user?.image;

  return (
    <div
      className={`relative  flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-1 ${
        session ? "border-none" : "border border-honeydew"
      }`}
    >
      {image ? (
        <Image src={image} alt="avatar" fill />
      ) : session ? (
        <Image
          src={`https://ui-avatars.com/api/?name=${session?.user?.name}&background=C5E7E8`}
          alt="Default Image"
          sizes="100vw"
          fill
        />
      ) : (
        <UserIcon size={26} />
      )}
    </div>
  );
};

export default User;
