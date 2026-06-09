"use client";
import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <div className="flex items-center">
        <button
          onClick={toggleDropdown}
          type="button"
          className="w-full h-11 flex items-center justify-center pl-2 px-4  text-black text-sm "
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="listbox"
        >
          {selectedValue}
        </button>
      </div>
      {isOpen && (
        <>
          <div className="origin-top-right absolute right-0 mt-1 w-28 z-10">
            <div
              className="border rounded-lg bg-white overflow-hidden p-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="block px-2 py-2 text-center text-sm text-black w-full"
                  role="menuitem"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDropdown;
