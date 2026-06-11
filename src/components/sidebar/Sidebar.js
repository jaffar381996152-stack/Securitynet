"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon, Logo } from "../../../public/icons/icons";

const NAV = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon, exact: false },
];

const Sidebar = ({ isSidebarOpen }) => {
  const pathname = usePathname();

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <Fragment>
      <section
        style={{
          background: "var(--bg-primary)",
          borderRight: "1px solid var(--border-sub)",
          height: "100%",
          width: "18.75rem",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
          display: isSidebarOpen ? undefined : "none",
        }}
        className={isSidebarOpen ? "hidden xl:flex xl:flex-col" : "flex flex-col xl:hidden"}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "block",
            padding: "20px 20px 16px",
            fontFamily: "var(--font-disp)",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "0.14em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          SECURITYNET.AI
        </Link>

        <div style={{ borderTop: "1px solid var(--border-sub)" }} />

        {/* Nav */}
        <ul style={{ display: "flex", flexDirection: "column", padding: "16px 12px", flex: 1, overflowY: "auto", listStyle: "none" }}>
          {NAV.map(({ href, label, Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href} style={{ marginTop: 4 }}>
                <Link
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    fontFamily: "var(--font-disp)",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: active ? "var(--text-inv)" : "var(--text-sec)",
                    background: active ? "var(--gold)" : "transparent",
                    borderLeft: active ? "none" : "2px solid transparent",
                    transition: "all 0.2s",
                    borderRadius: 0,
                  }}
                >
                  <Icon stroke={active ? "#0A0A0E" : "var(--text-muted)"} width={16} height={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom classification tag */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid var(--border-sub)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          ADMIN CONSOLE · SECURE
        </div>
      </section>
    </Fragment>
  );
};

export default Sidebar;
