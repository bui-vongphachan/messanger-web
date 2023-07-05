"use client";

import { User } from "@/types";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { createContext, useState, useMemo } from "react";
import LoadingSpinner from "./pageLoading";

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

  const user = useMemo(() => {
    return data ? (data.user as any) : null;
  }, [data]);

  if (status === "loading" && !isAllowed) return <LoadingSpinner />;

  return (
    <AuthenticationGateContext.Provider value={{ user }}>
      {props.children}
    </AuthenticationGateContext.Provider>
  );
};

export default AuthenticationGate;
