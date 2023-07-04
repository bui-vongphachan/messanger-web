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
          <div>
            <div className="ml-4 flex items-center md:ml-6">
              <ProfileButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
