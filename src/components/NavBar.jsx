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

      <div className="h-[60px] bg-white flex justify-between sticky top-0 border-b border-b-neutral-100 px-4 md:px-10 items-center z-50">
        <Link to="/" className="font-bold text-lg">
          ThinkLikeDev.
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2">
          {menu.map((item, index) => (
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
              key={index}
              className="px-4 text-xs py-2 hover:text-black/60 transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/about"
            className="font-semibold text-[10px] px-4 py-2 h-fit bg-black text-white hover:bg-black/80 rounded transition-colors"
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
          className={`fixed inset-0 h-[95vh] top-[60px] z-50 md:hidden transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMenu}
          />
          {/* White Drawer Panel */}
          <div
            className={`absolute right-0 top-0 w-4/5 sm:w-2/5 h-full bg-white flex flex-col py-6 px-6 shadow-lg transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            {/* Vertical ThinkLikeDev label on the left edge, bottom-to-top */}
            <Link
              to="/"
              onClick={closeMenu}
              style={{
                position: "absolute",
                left: "0px",
                bottom: "90px",
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

            <nav className="flex flex-col gap-4 mt-3">
              {menu.map((item, index) => (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
                  key={index}
                  className="text-base font-medium hover:text-black/60 transition-colors"
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/about"
                onClick={closeMenu}
                className="font-semibold text-sm w-fit px-4 py-2 bg-black text-white hover:bg-black/80 rounded transition-colors"
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
