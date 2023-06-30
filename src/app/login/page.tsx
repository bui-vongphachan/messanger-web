"use client";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="h-screen">
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
