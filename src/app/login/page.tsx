"use client";

import facebookIcon from "./facebook.svg";
import googleIcon from "./google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const SignInButton = (props: {
  disabled?: boolean;
  provider: "google" | "facebook";
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`bg-gray-100 transition-colors p-2 shadow-md rounded-full ${
        props.disabled ? `opacity-20 cursor-not-allowed ` : `hover:bg-gray-300`
      }`}
      onClick={() => {
        if (props.onClick) props.onClick();

        signIn(props.provider, {
          callbackUrl: process.env.NEXT_PUBLIC_SIGN_IN_CALLBACK_URL,
        });
      }}
    >
      {props.children}
    </button>
  );
};

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-12 items-center h-full pt-[10%]">
        <h1 className=" text-xl text-gray-500 font-medium">Login with ...</h1>
        <div className=" w-full sm:w-96 flex justify-evenly">
          <SignInButton
            disabled={isLoading}
            provider="google"
            onClick={() => setLoading(true)}
          >
            <Image width={64} src={googleIcon} alt="google icon" />
          </SignInButton>
          <SignInButton disabled provider="facebook">
            <Image width={64} src={facebookIcon} alt="facebook icon" />
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
