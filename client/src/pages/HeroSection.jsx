import { FaUser, FaFileAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";

function HeroSection() {
  return (
    <div className="flex-1 p-4">
      {/* Heading */}
      <div className="text-xl sm:text-2xl md:text-3xl font-medium mt-6 mb-4">
        <h1>Patient: John Doe</h1>
      </div>

      {/* Patient Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md shadow-gray-500/10 p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <FaUser className="text-5xl sm:text-6xl" />
          <div>
            <p className="text-lg sm:text-xl">Patient</p>
            <p className="text-2xl md:text-3xl font-medium">John Doe</p>
          </div>
        </div>

        <div className="text-sm sm:text-base font-medium space-y-1">
          <p>Sex: Male</p>
          <p>Age: 29</p>
          <p>Blood: A+</p>
        </div>
        <div className="text-sm sm:text-base font-medium space-y-1">
          <p>Last upload: 2 days ago</p>
          <p>Dept: General</p>
          <p>Patient ID: </p>
        </div>
      </div>

      {/* Upload Cards Section */}

      <div className="mt-4 grid grid-cols-1 gap-6 items-start">
        {/* Upload History */}
        <div className="w-full max-w-md flex flex-col gap-4 p-4 md:p-6 shadow-md shadow-gray-500/10">
          <h1 className="text-xl font-medium">Upload History</h1>
          <a
            href="/uploads"
            className="flex items-center gap-4 hover:shadow-md transition p-4"
          >
            <span className="text-2xl">
              <FaFileAlt />
            </span>
            <div className="flex-1 text-sm leading-4 font-medium">
              <h2>Blood test report</h2>
              <p className="font-normal text-xs">Dr. Ana</p>
            </div>
            <span className="text-3xl text-gray-500">
              <MdKeyboardArrowRight />
            </span>
          </a>
          <a
            href="/uploads"
            className="flex items-center gap-4 hover:shadow-md transition p-4"
          >
            <span className="text-2xl">
              <FaFileAlt />
            </span>
            <div className="flex-1 text-sm leading-4 font-medium">
              <h2>Sugar test report</h2>
              <p className="font-normal text-xs">Dr. Ana</p>
            </div>
            <span className="text-3xl text-gray-500">
              <MdKeyboardArrowRight />
            </span>
          </a>
        </div>

        {/* Upload Details */}
        <div className="w-full max-w-md flex flex-col gap-4 p-4 md:p-6 shadow-md shadow-gray-500/10">
          <h1 className="text-xl font-medium">Upload Details</h1>
          <a
            href="/uploads"
            className="flex items-center gap-4 hover:shadow-md transition p-4"
          >
            <span className="text-2xl">
              <FaFileAlt />
            </span>
            <div className="flex-1 text-sm leading-4 font-medium">
              <h2>Maleria reports</h2>
              <p className="font-normal text-xs">Uploaded 2 days ago</p>
            </div>
            <span className="text-3xl text-gray-500">
              <MdKeyboardArrowRight />
            </span>
          </a>
          <a
            href="/uploads"
            className="flex items-center gap-4 hover:shadow-md transition p-4"
          >
            <span className="text-2xl">
              <GiMedicines />
            </span>
            <div className="flex-1 text-sm leading-4 font-medium">
              <h2>Medicine Prescription</h2>
              <p className="font-normal text-xs">Uploaded last week</p>
            </div>
            <span className="text-3xl text-gray-500">
              <MdKeyboardArrowRight />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
