import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";

function NavBar({ onToggleSidebar }) {
  return (
    <div className="relative flex items-center justify-between px-4 py-4 sm:px-6 shadow-lg shadow-gray-200/20 h-16">
      <button
        onClick={onToggleSidebar}
        className="absolute left-4 top-1/2 transform -translate-y-1/2  md:hidden text-2xl text-gray-700"
      >
        <HiMenu />
      </button>

      {/* Logo */}
      <Link to="/">
        <h1 className="text-xl sm:text-2xl ml-10 md:text-3xl md:ml-0 font-bold text-gray-900 cursor-pointer">
          MedLens
        </h1>
      </Link>

      {/* Profile Info */}
      <div className="ml-auto flex items-center gap-2 cursor-pointer">
        <img
          src="/images/myimg.jpg"
          alt="user"
          className="w-6 h-6 rounded-full"
        />
        <h2 className="hidden sm:block font-medium text-sm sm:text-md">
          Suraj Singh
        </h2>
        <span className="text-2xl sm:text-3xl">
          <RiArrowDropDownLine />
        </span>
      </div>
    </div>
  );
}

export default NavBar;
