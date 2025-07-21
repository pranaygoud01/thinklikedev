import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FiMenu, FiX } from "react-icons/fi";

const menu = ["Home", "Find Jobs", "Blogs", "Free Resources"];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Inline CSS for sidebar slide-in animation */}
      <style>{`
        .mobile-drawer {
          transform: translateX(100%);
          transition: transform 0.25s cubic-bezier(.4,0,.2,1);
        }
        .mobile-drawer.open {
          transform: translateX(0);
        }
        .mobile-overlay {
          backdrop-filter: blur(2px);
        }
      `}</style>
      <div className="h-[60px] bg-white flex justify-between sticky top-0 border-b border-b-neutral-300 px-4 md:px-10 items-center z-50">
        <Link to="/" className="font-bold text-lg">
          ThinkLikeDev.
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2">
          {menu.map((item, index) => (
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
              key={index}
              className="px-4 text-xs py-2 hover:text-blue-600 transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/about"
            className="font-semibold text-[10px] px-4 py-2 h-fit bg-black text-white hover:bg-neutral-800 rounded transition-colors"
          >
            About
          </Link>
        </ul>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <FiMenu />
        </button>
        {/* Mobile Drawer with Animation */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${isOpen ? "block" : "hidden"}`}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-40 mobile-overlay"
            onClick={closeMenu}
          />
          {/* White Drawer Panel */}
          <div
            className={`absolute right-0 top-0 w-4/5 sm:w-2/5 h-full bg-white flex flex-col py-6 px-6 shadow-lg mobile-drawer ${
              isOpen ? "open" : ""
            }`}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            {/* Vertical ThinkLikeDev label on the left edge, bottom-to-top */}
            <Link
              to="/"
              onClick={closeMenu}
              style={{
                position: "absolute",
                left: "0px",
                bottom: "40px",
                backgroundColor: "black",
                color: "white",
                padding: "8px 12px",
                fontWeight: "bold",
                fontSize: "25px",
                borderRadius: "6px 6px 0 0",
                transform: "rotate(-90deg)",
                transformOrigin: "left bottom",
                whiteSpace: "nowrap",
                cursor: "pointer",
                zIndex: 51
              }}
            >
              ThinkLikeDev.
            </Link>
            {/* Close Button at Top Right */}
            <button
              className="absolute top-2 right-2 text-3xl p-2 rounded-full hover:bg-neutral-200 transition-colors"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              style={{
                zIndex: 100
              }}
            >
              <FiX />
            </button>
            <nav className="flex flex-col gap-4 mt-10">
              {menu.map((item, index) => (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
                  key={index}
                  className="text-base font-medium hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/about"
                onClick={closeMenu}
                className="font-semibold text-sm w-fit px-4 py-2 bg-black text-white hover:bg-neutral-800 rounded transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
