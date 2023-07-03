import { AuthenticationGateContext } from "@/components/authenticationGate";
import { useGetUsersQuery } from "@/hooks";
import Image from "next/image";
import { useContext, Fragment } from "react";
import { UserContext } from "../page";
import UserListLoading from "./loading";

const UserList = () => {
  return (
    <ul className=" w-full overflow-x-hidden overflow-y-auto divide-y-[0px] divide-blue-800">
      <Content />
    </ul>
  );
};

const Content = () => {
  const { user } = useContext(AuthenticationGateContext);

  const { selectedUser, setSelectedUser, setSelectedConversation } =
    useContext(UserContext);

  const { data, error, loading } = useGetUsersQuery({
    userId: user ? user._id : "",
  });

  if (loading) return <UserListLoading />;

  if (!data || !!error) return null;

  return (
    <Fragment>
      {data.getUsers.map((item, index) => {
        return (
          /* Conversation Item */
          <li
            key={index}
            className={
              (item.user._id === selectedUser?._id
                ? " bg-blue-800 hover:bg-blue-700 text-white"
                : " hover:bg-blue-900") +
              " relative p-4 group cursor-pointer transition-colors rounded-lg"
            }
            onClick={() => {
              setSelectedUser(item.user);
              setSelectedConversation(item.conversation);
            }}
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.user.image}
                className=" rounded-full"
                width={"50"}
                height={"50"}
                alt=""
              />
              <div className="w-[calc(100%-66px)] relative flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h5 className=" text-sm font-normal text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.user.name}
                  </h5>
                </div>
                <div className="flex">
                  <div className="flex flex-1 items-center gap-2 w-[calc(100%-20px)]">
                    <p className=" text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.conversation?.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </Fragment>
  );
};
export default UserList;
