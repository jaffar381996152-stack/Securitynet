import React, { Fragment } from "react";
import DropdownUser from "../dropdownuser/DropdownUser";
import { MenuIcon } from "../../../public/icons/icons";

const Topbar = ({ toggleSidebar }) => {
  return (
    <Fragment>
      <header
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-sub)",
          padding: "0 20px",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Mobile: menu toggle */}
        <button
          onClick={toggleSidebar}
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--text-muted)",
            cursor: "pointer",
          }}
          className="xl:hidden"
        >
          <MenuIcon width={24} height={11} stroke="var(--text-muted)" />
        </button>

        {/* Right: user dropdown */}
        <div className="xl:ms-auto">
          <DropdownUser />
        </div>
      </header>
    </Fragment>
  );
};

export default Topbar;
