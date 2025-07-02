import { useState } from "react";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import { useEffect } from "react";

function Uploads() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", "someUserIdOrName");

    try {
      setIsUploading(true);
      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Uploaded Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/upload");
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Failed to load uploaded files", err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 ${
              isUploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, PDF or DOCX (Max size: 10MB)
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </Label>
        </div>

        {file && (
          <p className="mt-3 text-sm text-gray-600">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}

        <button
          className={`mt-4 px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
            isUploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </button>

        {message && (
          <p className="mt-2 text-sm text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>

      {/* Uploaded Files */}

      {isLoadingFiles ? (
        <p>Loading uploaded files...</p>
      ) : uploadedFiles.length == 0 ? (
        <p className="text-gray-500 mt-4 text-center">No uploaded files yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploadedFiles.map((file) => {
            const isPDF = file.url.endsWith(".pdf");
            const fileUrl = isPDF
              ? `https://res.cloudinary.com/dm0icojjc/raw/${file.publicId}.pdf`
              : file.url;

            return (
              <a
                key={file._id}
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded-lg overflow-hidden shadow hover:shadow-md transition"
              >
                {isPDF ? (
                  <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-700 text-sm">
                    <span className="text-center px-4 py-2">
                      📄 {file.publicId}.pdf
                    </span>
                  </div>
                ) : (
                  <img
                    src={fileUrl}
                    alt={file.publicId}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-2 text-center text-sm text-gray-600 truncate">
                  {file.publicId}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Uploads;
