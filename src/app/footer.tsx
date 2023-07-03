import Image from "next/image";
import microphoneIcon from "./send.svg";

const Footer = () => {
  return (
    <footer className="flex gap-4 items-center mt-auto justify-between py-4 px-8 bg-blue-950">
      <div className=" rounded-3xl w-full overflow-hidden">
        <input className=" text-sm w-full h-12 px-4 outline-none" />
      </div>
      <button className=" bg-blue-800 hover:bg-blue-900 transition-colors px-2 rounded-full shrink-0 w-[48px] h-[48px] flex justify-center items-center">
        <Image
          src={microphoneIcon}
          width={24}
          height={24}
          className=" translate-x-[4px]"
          alt="Microfone"
        />
      </button>
    </footer>
  );
};

export default Footer;
