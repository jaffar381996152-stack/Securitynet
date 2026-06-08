import React, { Fragment } from "react";
import DropdownUser from "../dropdownuser/DropdownUser";
import { MenuIcon } from "../../../public/icons/icons";

const Topbar = ({ toggleSidebar }) => {
  return (
    <Fragment>
      <header className="bg-white border border-border px-5 md:py-[0.844rem] py-2 sticky top-0 z-20">
        <nav className="flex xl:justify-end justify-between items-center">
          <DropdownUser />
          <button
            className="block xl:hidden ms-5 bg-logo px-2 py-3 rounded-lg"
            onClick={toggleSidebar}
          >
            <MenuIcon width={24} height={11} stroke="black" />
          </button>
        </nav>
      </header>
    </Fragment>
  );
};

export default Topbar;
