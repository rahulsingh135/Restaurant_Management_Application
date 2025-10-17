import React from "react";
import logo from "/cLogo.png";
import { FaBell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import titleCase from "../utils/titleCase";

export default function Navebar({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <div className="bg-white w-full  h-16 px-4 sm:px-6 flex items-center justify-between shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3">
          <button className="text-gray-700 sm:hidden " onClick={toggleSidebar}>
            <MdMenu size={28} />
          </button>
          {/* <input
            id="main_search_box"
            type="text"
            placeholder="Search here..."
            className="hidden sm:block border border-gray-600 dark:bg-gray-800 text-gray-600 px-4 py-2 rounded-md w-40 sm:w-64"
          /> */}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button className="text-gray-400 hover:text-mainColor">
            <FaBell />
          </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col">
              <span className=" sm:inline text-sm font-medium">
                {titleCase(user?.name || "User")}
              </span>
              <span className=" sm:inline text-gray-600 text-xs pr-1 ">
                {titleCase(user?.role || "Role")}
              </span>
            </div>
            <img
              src={logo}
              alt="Profile"
              className="rounded-full w-10 h-10 border  border-mainColor p-1 bg-secBg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
