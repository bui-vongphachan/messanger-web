"use client";

import facebookIcon from "./facebook.svg";
import googleIcon from "./google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="h-screen w-full bg-blue-950">
      <div className="flex flex-col gap-12 items-center h-full pt-[10%]">
        <h1 className=" text-xl text-blue-500 font-medium">Login with ...</h1>
        <div className=" w-full sm:w-96 flex justify-evenly">
          <button
            className=" bg-blue-300 hover:bg-blue-800 transition-colors p-2 rounded-full"
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
          >
            <Image width={64} src={googleIcon} alt="google icon" />
          </button>
          <button
            disabled
            className=" opacity-20 bg-blue-300 p-2 rounded-full"
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
          >
            <Image width={64} src={facebookIcon} alt="facebook icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
