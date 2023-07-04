import { AuthenticationGateContext } from "@/components/authenticationGate";
import { GetUnreadMessage, useGetUsersQuery } from "@/hooks";
import { addUnreadMessageToUserList } from "@/utils";
import Image from "next/image";
import { useContext, Fragment } from "react";
import { UserContext } from "../contexts";
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

  const { selectedUser, setSelectedUser, getUserQueryResult } =
    useContext(UserContext);

  GetUnreadMessage({ userId: user?._id! }, getUserQueryResult!);

  if (!getUserQueryResult || getUserQueryResult.loading)
    return <UserListLoading />;

  if (!getUserQueryResult.data || !!getUserQueryResult.error) return null;

  return (
    <Fragment>
      {getUserQueryResult.data.getUsers.map((item, index) => {
        const { latestMessage } = item;
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
              addUnreadMessageToUserList(getUserQueryResult, index);
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
                  <div
                    className="new-message-indicator"
                    style={{
                      display: (() => {
                        if (!latestMessage) return "none";

                        if (latestMessage.senderId === user?._id) return "none";

                        if (latestMessage.isRead) return "none";

                        return "flex";
                      })(),
                    }}
                  >
                    1
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-1 items-center gap-2 w-[calc(100%-20px)]">
                    <p className=" text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.latestMessage?.content}
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
