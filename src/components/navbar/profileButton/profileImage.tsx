"use client";

import { AuthenticationGateContext } from "@/components/authenticationGate";
import Image from "next/image";
import { useContext } from "react";

const ProfileImage = () => {
  const { user } = useContext(AuthenticationGateContext);

  return (
    <Image
      src={
        user
          ? user.image
          : "https://avatars.githubusercontent.com/u/36913838?v=4"
      }
      alt=""
      fill
      className="rounded-full"
      sizes="100"
    />
  );
};

export default ProfileImage;
