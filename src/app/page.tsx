"use client";

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <button
        className=" text-3xl bg-red-200 p-24 "
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    </main>
  );
}
