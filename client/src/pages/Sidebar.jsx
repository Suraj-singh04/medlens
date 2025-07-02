import { LuLayoutDashboard } from "react-icons/lu";
import { TbReportMedical } from "react-icons/tb";
import {
  IoCloudUploadSharp,
  IoDocumentSharp,
  IoSettingsSharp,
  IoHelpCircle,
  IoNotifications,
} from "react-icons/io5";
import { MdHistory, MdLogout } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";

function SideBar({ isMobile, onClose }) {
  const sidebarClasses = isMobile
    ? "fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg md:hidden"
    : "hidden md:block md:w-60 md:h-full md:bg-white md:shadow-lg";

  return (
    <div className={sidebarClasses}>
      {" "}
      {isMobile && (
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-lg font-bold text-gray-700">
            ✕
          </button>
        </div>
      )}
      <div className="p-4 overflow-y-auto max-h-full">
        <ul className="mb-12 space-y-2">
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/dashboard" className="flex items-center">
              <span className="pr-4 text-lg">
                <LuLayoutDashboard />
              </span>
              <span className="font-medium text-md">Dashboard</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/reports" className="flex items-center">
              <span className="pr-3.5 text-xl">
                <TbReportMedical />
              </span>
              <span className="font-medium text-md">My Reports</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/uploads" className="flex items-center">
              <span className="pr-4 text-lg">
                <IoCloudUploadSharp />
              </span>
              <span className="font-medium text-md">Uploads</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/activity" className="flex items-center">
              <span className="pr-4 text-lg">
                <MdHistory />
              </span>
              <span className="font-medium text-md">Recent activity</span>
            </Link>
          </li>
        </ul>

        <ul className="mb-48">
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/documents" className="flex items-center">
              <span className="pr-4 text-lg">
                <IoDocumentSharp />
              </span>
              <span className="font-medium text-md">Documents</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/updates" className="flex items-center">
              <span className="pr-4 text-lg">
                <GrUpdate />
              </span>
              <span className="font-medium text-md">Status updates</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/settings" className="flex items-center">
              <span className="pr-4 text-lg">
                <IoSettingsSharp />
              </span>
              <span className="font-medium text-md">Settings</span>
            </Link>
          </li>
        </ul>

        <ul>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/help" className="flex items-center">
              <span className="pr-4 text-lg">
                <IoHelpCircle />
              </span>
              <span className="font-medium text-md">Help</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/notifications" className="flex items-center">
              <span className="pr-4 text-lg">
                <IoNotifications />
              </span>
              <span className="font-medium text-md">Notifications</span>
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-600/10">
            <Link to="/logout" className="flex items-center">
              <span className="pr-4 text-lg">
                <MdLogout />
              </span>
              <span className="font-medium text-md">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
