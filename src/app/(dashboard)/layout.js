"use client";
import React, { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Topbar toggleSidebar={toggleSidebar} />
      <main
        className="xl:ps-[18.75rem]"
        style={{
          padding: "32px 28px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
