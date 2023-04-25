import Link from "next/link";
import UserIcon from "../icons/UserIcon";

const UserGroup = () => {
  const currentUser = false;
  return (
    <div className="md: flex items-center gap-3 border-t border-gray-400 pt-2 md:border-l md:border-t-0 md:pl-3 md:pt-0 ">
      {currentUser ? (
        <Link href={""}>LogOut</Link>
      ) : (
        <Link href={""}>Login</Link>
      )}
      <div className="hidden rounded-full border border-gray-600 p-1 md:block">
        <UserIcon size={16} />
      </div>
    </div>
  );
};

export default UserGroup;
