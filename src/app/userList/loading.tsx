import Image from "next/image";
import { Fragment } from "react";
import avatar from "../avatar.svg";

const UserListLoading = () => {
  return (
    <Fragment>
      {new Array(10).fill(0).map((_, index) => {
        return (
          <li key={index} className="relative p-4 transition-colors">
            <div className="flex items-center gap-4">
              <Image
                src={avatar}
                className=" rounded-full animate-pulse"
                width={"50"}
                height={"50"}
                alt=""
              />
              <div className="w-[calc(100%-66px)] relative flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className=" w-full h-3 bg-gray-300 rounded-md animate-pulse" />
                </div>
                <div className="flex">
                  <div className="flex flex-1 items-center gap-2 w-[calc(100%-20px)]">
                    <div className=" w-full h-6 bg-gray-200 rounded-md animate-pulse" />
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

export default UserListLoading;
