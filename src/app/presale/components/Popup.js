"use client";
import { useState } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="px-6 py-[0.875rem] uppercase relative rounded-xl group overflow-hidden text-sm font-semibold bg-yellow-light text-white"
      >
        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
        <span className="relative group-hover:text-white">wallet</span>
      </button>

      {/* Popup Box */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] sm:w-[500px] rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-black"
            >
              &times;
            </button>
            {/* content */}
            <p className="text-black">
            hyyy
            </p>
            <div className="md:mt-4 mt-2 flex justify-end">
              <button
                onClick={togglePopup}
                className="bg-yellow-light text-white md:px-4 px-2 md:py-2 py-1.5 md:rounded-xl rounded-md md:text-sm text-xs uppercase font-semibold shadow-md "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
