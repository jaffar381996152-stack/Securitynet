"use client";
import React, { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";
import "../globals.css";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
      <div className="bg-light-gray h-full">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="xl:ps-[18.75rem] px-7" style={{height: "calc(100vh - 76px)"}}>
          {children}
        </main>
      </div>
    
  );
}
