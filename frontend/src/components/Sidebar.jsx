import logo from "/cLogo.png";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { BiCart, BiGroup, BiListUl, BiLogOut } from "react-icons/bi";
import { MdDashboard, MdFeedback } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";

export default function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
        ></div>
      )}

      <div
        className={`z-40 flex min-h-screen h-full fixed flex-col justify-between w-63 p-5 transition-transform duration-300 ease-in-out bg-white text-gray-700 shadow-[4px_0_4px_0_rgba(0,0,0,0.1)] sm:translate-x-0 
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:static`}
      >
        <div className="">
          <div className="mb-2 flex items-center pb-5 gap-2 border-b border-slate-300">
            <img className="h-20 w-30" src={logo} alt="Logo" />
          </div>

          <div className="pt-2 flex-1">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white ${
                      isActive ? "bg-mainColor text-white" : ""
                    }`
                  }
                >
                  <MdDashboard /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white ${
                      isActive ? "bg-mainColor text-white" : ""
                    }`
                  }
                >
                  <BiListUl /> Menu Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white ${
                      isActive ? "bg-mainColor text-white" : ""
                    }`
                  }
                >
                  <GiKnifeFork /> Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customers"
                  className={({ isActive }) =>
                    `flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white ${
                      isActive ? "bg-mainColor text-white" : ""
                    }`
                  }
                >
                  <BiGroup /> Customers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    `flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white ${
                      isActive ? "bg-mainColor text-white" : ""
                    }`
                  }
                >
                  <BiCart /> Order
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/billing"
                  className={({ isActive }) =>
                    `flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white ${
                      isActive ? "bg-mainColor text-white" : ""
                    }`
                  }
                >
                  <RiBillLine /> Billing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-mainColor text-white" : ""
                    } flex items-center p-2 gap-3 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white`
                  }
                >
                  <MdFeedback /> Feedback
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-3 pt-4 border-t border-slate-300 flex w-full">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-mainColor hover:text-white dark:hover:text-white w-full text-left"
          >
            <BiLogOut /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
