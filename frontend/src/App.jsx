import { Outlet, useMatches } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { NavBar } from "./Components/NavBar";
import { Sidebar } from "./Components/Sidebar";
import { useSelector } from "react-redux";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { id } = useMatches()[1] || {};
  const hide = !(id === "/login");

  // Optional: lock body scroll on mobile when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  useEffect(() => {
    setLoggedin(isLoggedIn);
  }, [isLoggedIn, loggedin, user]);

  return (
    <div className="h-screen flex flex-col">
      {hide && (
        <NavBar
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          user={user}
          loggedin={loggedin}
        />
      )}

      <div className="flex-1 ">
        {/* Sidebar overlays the page */}
        {hide && (
          <div className="z-10 absolute ">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
        )}

        {/* Main content does NOT move */}
        <div className=" relative h-full overflow-y-auto">
          <Toaster
            richColors
            position="top-right"
            closeButton
            duration={3000}
          />
          {sidebarOpen && (
            <div className="z-5 absolute w-full h-full bg-black/20 backdrop-blur-sm "></div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
