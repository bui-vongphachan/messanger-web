"use client";

import { User } from "@/types";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { createContext, useState } from "react";

export const AuthenticationGateContext = createContext<{
  user: User | null;
}>({
  user: null,
});

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

  return (
    <AuthenticationGateContext.Provider
      value={{ user: data ? (data.user as any) : null }}
    >
      {props.children}
    </AuthenticationGateContext.Provider>
  );
};

export default AuthenticationGate;
