import Image from "next/image";
import ProfileButton from "./profileButton";

const Navbar = () => {
  return (
    <nav>
      <div className=" container m-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 relative">
                <Image
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                  sizes="100"
                  fill
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>

                {/* Heroicon name: outline/bell */}

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h18v18H3V3z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 14v-3c0-1.1.9-2 2-2s2 .9 2 2v3m6 0v-3c0-1.1.9-2 2-2s2 .9 2 2v3"
                  />
                </svg>
              </button>
              <ProfileButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
