"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { Fragment, useState } from "react";

const AuthenticationGate = (props: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [isAllowed, setIsAllowed] = useState(false);

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      if (pathname !== "/login") return redirect("/login");

      setIsAllowed(true);
    },
  });

  if (status === "loading" && !isAllowed)
    return <div className=" h-full">Loading...</div>;

  return <Fragment>{props.children}</Fragment>;
};

export default AuthenticationGate;
