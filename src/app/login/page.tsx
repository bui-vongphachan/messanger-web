"use client";

import facebookIcon from "./facebook.svg";
import googleIcon from "./google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInButton = (props: {
  disabled?: boolean;
  provider: "google" | "facebook";
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`bg-gray-100 transition-colors p-2 shadow-md rounded-full ${
        props.disabled ? `opacity-20 cursor-not-allowed ` : `hover:bg-gray-300`
      }`}
      onClick={() =>
        signIn(props.provider, {
          callbackUrl: process.env.NEXT_PUBLIC_SIGN_IN_CALLBACK_URL,
        })
      }
    >
      {props.children}
    </button>
  );
};

const LoginPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-12 items-center h-full pt-[10%]">
        <h1 className=" text-xl text-gray-500 font-medium">Login with ...</h1>
        <div className=" w-full sm:w-96 flex justify-evenly">
          <SignInButton provider="google">
            <Image width={64} src={googleIcon} alt="google icon" />
          </SignInButton>
          <SignInButton provider="facebook">
            <Image width={64} src={facebookIcon} alt="facebook icon" />
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
