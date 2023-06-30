import ProfileImage from "./profileImage";
import SignOutButton from "./signOutButton";

const ProfileButton = () => {
  return (
    <div className="ml-3 relative">
      <div>
        <button
          type="button"
          className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8">
            <ProfileImage />
          </div>
        </button>
      </div>
      <div
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-0"
        >
          Your Profile
        </a>

        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-1"
        >
          Settings
        </a>

        <SignOutButton />
      </div>
    </div>
  );
};

export default ProfileButton;
