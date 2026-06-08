"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  Logo,
  UserIcon,
} from "../../../public/icons/icons";

const Sidebar = ({ isSidebarOpen }) => {
  const pathname = usePathname();
  const activeClass = "bg-yellow text-black";
  const iconColor = (isActive) => (isActive ? "black" : "white");
  return (
    <Fragment>
      <section
        className={`bg-black h-full w-[18.75rem] fixed top-0 left-0 z-50 transition-all ${
          isSidebarOpen ? "hidden xl:block" : "block xl:hidden"
        }`}
      >
        <Link href="/" className="block px-5 md:py-2.5 py-1">
          <Logo
            fill="#1C202B"
            width={90}
            height={55}
            className="md:w-[70px] w-[60px]"
          />
        </Link>

        <div className="border border-text"></div>
        <ul className="flex flex-col text-sm font-normal px-5 pt-5 overflow-auto h-full">
          <li>
            <Link
              href="/dashboard"
              className={`${
                pathname === "/dashboard" ? activeClass : "text-white"
              } flex items-center rounded-[0.625rem] ps-3.5 py-2.5 text-base font-semibold hover:text-black hover:bg-yellow transition duration-500`}
            >
              <DashboardIcon
                stroke={iconColor(pathname === "/dashboard")}
                width={18}
                height={18}
              />
              <span className="ps-2.5">Dashboard</span>
            </Link>
          </li>
          <li className="mt-1.5">
            <Link
              href="/dashboard/event"
              className={`${
                pathname === "/dashboard/event" ? activeClass : ""
              } flex items-center text-white rounded-[0.625rem] ps-3.5 py-2.5 text-base font-semibold hover:text-black hover:bg-yellow transition duration-500`}
            >
              <UserIcon
                stroke={iconColor(pathname === "/dashboard/event")}
                width={18}
                height={18}
              />
              <span className="ps-2.5">UpComing Event</span>
            </Link>
          </li>
          <li className="mt-1.5">
            <Link
              href="/dashboard/posts"
              className={`${
                pathname.startsWith("/dashboard/posts") ? activeClass : ""
              } flex items-center text-white rounded-[0.625rem] ps-3.5 py-2.5 text-base font-semibold hover:text-black hover:bg-yellow transition duration-500`}
            >
              <UserIcon
                stroke={iconColor(pathname.startsWith("/dashboard/posts"))}
                width={18}
                height={18}
              />
              <span className="ps-2.5">Posts</span>
            </Link>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

export default Sidebar;
