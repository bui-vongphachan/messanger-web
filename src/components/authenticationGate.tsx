"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const AuthenticationGate = (props: { children: React.ReactNode }) => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  console.log({ status, data });

  if (status === "loading") return <div className=" h-full">Loading...</div>;

  return <Fragment>{props.children}</Fragment>;
};

export default AuthenticationGate;
