import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../contexts";
import LeftArrow from "./left-arrow.svg";

const Header = () => {
  const { selectedUser, setSelectedUser } = useContext(UserContext);

  if (!selectedUser) return null;

  return (
    <nav className=" p-4 bg-gray-100 flex items-center gap-4">
      <button
        className=" w-[40px] h-[40px] bg-gray-300 rounded-full shrink-0 md:hidden flex items-center justify-center"
        onClick={() => setSelectedUser(null)}
      >
        <Image
          src={LeftArrow}
          className=" rounded-full"
          width={"32"}
          height={"32"}
          alt=""
        />
      </button>
      <div className="flex items-center gap-2">
        <Image
          src={selectedUser.user.image}
          className=" rounded-full"
          width={"40"}
          height={"40"}
          alt=""
        />
        <h1 className=" font-medium">{selectedUser.user.name}</h1>
      </div>
    </nav>
  );
};

export default Header;
