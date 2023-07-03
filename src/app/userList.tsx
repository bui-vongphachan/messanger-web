import { AuthenticationGateContext } from "@/components/authenticationGate";
import { useGetUsersQuery } from "@/hooks";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "./page";

const UserList = () => {
  const { user } = useContext(AuthenticationGateContext);

  const { selectedUser, setSelectedUser } = useContext(UserContext);

  const { result } = useGetUsersQuery({ userId: user ? user._id : "" });

  if (!result.data) return null;

  return (
    <ul className=" w-full overflow-x-hidden overflow-y-auto divide-y-[0px] divide-blue-800">
      {result.data.getUsers.map((user, index) => {
        return (
          /* Conversation Item */
          <li
            key={index}
            className={
              (user._id === selectedUser?._id
                ? " bg-blue-800 hover:bg-blue-700 text-white"
                : " hover:bg-blue-900") +
              " relative p-4 group cursor-pointer transition-colors"
            }
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center gap-4">
              <Image
                src={user.image}
                className=" rounded-full"
                width={"50"}
                height={"50"}
                alt=""
              />
              <div className="w-[calc(100%-66px)] relative flex flex-col">
                <div className="flex justify-between items-center">
                  <h5 className=" text-sm font-normal text-ellipsis overflow-hidden whitespace-nowrap">
                    {user.name}
                  </h5>
                </div>
                <div className="flex">
                  <div className="flex flex-1 items-center gap-2 w-[calc(100%-20px)]">
                    <p className=" text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Rerum porro deleniti suscipit, at nostrum doloremque
                      aspernatur perferendis praesentium repellendus id iste
                      exercitationem facilis debitis dolor dolorum impedit
                      eveniet! Libero, fugiat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
