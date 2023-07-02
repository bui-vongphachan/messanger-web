import { useState } from "react";
import ProfileImage from "./profileImage";
import SignOutButton from "./signOutButton";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-3 relative">
      <div>
        <button
          type="button"
          className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8">
            <ProfileImage />
          </div>
        </button>
      </div>
      <div
        className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <SignOutButton />
      </div>
    </div>
  );
};

export default ProfileButton;
