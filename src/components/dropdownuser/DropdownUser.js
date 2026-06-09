"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import GeneratedAvatar from "@/components/brand/GeneratedAvatar";
import { ChevronDown, LogoutIcon } from "../../../public/icons/icons";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [session, setSession] = useState(null);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    let active = true;
    getSession().then((s) => {
      if (active) setSession(s);
    });
    return () => {
      active = false;
    };
  }, []);

  const displayName = session?.user?.name || session?.user?.email || "Admin";

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {displayName}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <GeneratedAvatar name={displayName} size={48} />
        </span>
        <ChevronDown width={12} height={8} fill="black" />
        {/* <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg> */}
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute lg:right-0 -right-24 mt-4 flex w-44 flex-col rounded-md border border-white bg-white ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-2 px-2 py-2">
          <li className="duration-300 ease-in-out hover:bg-yellow rounded-md px-2 py-1">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="flex items-center gap-2 text-sm font-medium lg:text-base"
            >
              <LogoutIcon stroke="black" width={16} height={17} />
              Log Out
            </button>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
