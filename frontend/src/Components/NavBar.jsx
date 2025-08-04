import { Menu, Search, Video, Bell, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";


export function NavBar({ toggleSidebar,loggedin, user }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  return (
    <>
      <div className="navbar bg-base-200 sticky top-0 z-50 shadow-md px-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="btn btn-ghost btn-square">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <img
              src="/Public/logo.svg"
              alt="Logo"
              className="h-20 sm:h-10 lg:h-20 w-auto max-h-24"
            />
          </Link>
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="hidden sm:flex flex-1 justify-center">
          <div className="join w-full max-w-xl">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered join-item w-full"
            />
            <button className="btn join-item btn-outline">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Icons or Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Mobile search */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="btn btn-square btn-outline sm:hidden"
          >
            <Search className="w-5 h-5" />
          </button>

          {loggedin ? (
            <>
              <button className="btn btn-ghost btn-square">
                <Video className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-square">
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary w-2 h-2 text-xs p-2 ">
                    12
                  </span>
                  <Bell className="w-5 h-5" />
                </div>
              </button>
              <Link to={`/setting/${user._id}`}>
                <img
                  src={user?.avatar || ""}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-primary">Sign In</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline btn-secondary">
                  Log In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 sm:hidden bg-base-200 p-4 flex items-start gap-2 shadow-lg">
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="btn btn-circle btn-ghost"
          >
            <X className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Search"
            autoFocus
            className="input input-bordered w-full rounded-full"
          />
        </div>
      )}
    </>
  );
}
