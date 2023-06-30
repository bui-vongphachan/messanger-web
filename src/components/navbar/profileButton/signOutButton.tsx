"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <a
      href="#"
      className="block px-4 py-2 text-sm text-gray-700"
      role="menuitem"
      tabIndex={-1}
      id="user-menu-item-2"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sign out
    </a>
  );
};

export default SignOutButton;
