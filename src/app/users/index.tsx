import Image from "next/image";

const Users = () => {
  return (
    <div className=" max-h-full overflow-hidden flex flex-col divide-y-2 divide-gray-300">
      {new Array(20).fill(null).map((_, index) => {
        /* ີ user profile */
        return (
          <div
            key={index}
            className=" p-2 cursor-pointer group hover:bg-gray-300 transition-colors"
          >
            <div className=" flex gap-2">
              <div className=" h-8 w-8 relative">
                <Image
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt=""
                  className="rounded-full"
                  fill
                  sizes="100"
                />
              </div>
              <div className=" flex flex-col">
                <div className=" text-sm font-semibold">{index} User Name</div>
                <div className=" text-xs font-light">User Email</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
