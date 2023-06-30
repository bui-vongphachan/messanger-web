"use client";

import { SessionProvider, signIn, useSession } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <SessionProvider>
        <button
          className=" text-3xl bg-red-200 p-24 "
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </button>
        <SAD />
      </SessionProvider>
    </main>
  );
}

const SAD = () => {
  const session = useSession();

  console.log({ session });

  return null;
};
