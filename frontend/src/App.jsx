import { useState, useEffect } from "react";
import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Menu from "./components/Menu.jsx";
import MenuCategory from "./components/MenuCategory.jsx";
import Order from "./components/Order.jsx";
import Customers from "./components/Customers.jsx";
import Billing from "./components/Billing.jsx";
import Feedback from "./components/Feedback.jsx";

import { Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen h-auto  w-full bg-mainBg dark:bg-gray-800">
      <div className=" min-h-screen h-auto">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />
      </div>

      <div className=" flex-col w-full  ">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-8">
          <Routes>
            <Route index element={<Dashboard />} path="/" />
            <Route element={<MenuCategory />} path="/menu-category" />
            <Route element={<Menu />} path="/menu" />
            <Route element={<Customers />} path="/customers" />
            <Route element={<Order />} path="/order" />
            <Route element={<Billing />} path="/billing" />
            <Route element={<Feedback />} path="/feedback" />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
