import React from "react";

const NavBar = () => {
  const menu = ["Find Jobs", "Blogs", "Free Resources"];
  return (
    <div className="h-[60px] bg-white flex justify-between sticky top-0 border-b border-b-neutral-300 px-10 items-center">
      <h1 className="font-medium">ThinkLikeDev.</h1>
      <ul className="flex items-center">
        {menu.map((item, index) => {
          return <li className="px-4 text-xs py-2">{item}</li>;
        })}
        <button className="font-semibold text-[10px] px-4 py-2 h-fit bg-black text-white ">
          About
        </button>
      </ul>
    </div>
  );
};

export default NavBar;
