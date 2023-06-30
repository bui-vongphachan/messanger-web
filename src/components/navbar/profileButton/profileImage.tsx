"use client";

import { SessionContext } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";

const ProfileImage = () => {
  const session = useContext(SessionContext);

  if (!session) return null;

  if (!session.data) return null;

  if (!session.data.user) return null;

  const { user } = session.data;

  return (
    <Image
      src={user.image || "https://avatars.githubusercontent.com/u/36913838?v=4"}
      alt=""
      fill
      className="rounded-full"
      sizes="100"
    />
  );
};

export default ProfileImage;
