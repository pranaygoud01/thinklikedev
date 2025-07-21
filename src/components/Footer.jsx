import React from "react";
import { PiDevToLogoLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white px-10 max-lg:p-5 max-lg:py-8 py-12">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-10">
        {/* Brand and Tagline */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <span className="text-3xl"><PiDevToLogoLight /></span>
            <span className="text-xl font-bold">ThinkLikeDev</span>
          </div>
          <p className="text-neutral-400 text-xs mt-2">
            Discover, grow, and land your next opportunity. Join a community designed for passionate developers.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 w-full md:w-1/3">
          <div>
            <h3 className="font-semibold text-sm mb-2">Quick Links</h3>
            <ul className="text-neutral-300 text-xs flex flex-col gap-1">
              <li><a href="#" className="hover:text-white">Jobs</a></li>
              <li><a href="#" className="hover:text-white">Resources</a></li>
              <li><a href="#" className="hover:text-white">Blogs</a></li>
              <li><a href="#" className="hover:text-white">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Support</h3>
            <ul className="text-neutral-300 text-xs flex flex-col gap-1">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Subscribe & Social */}
        <div className="flex flex-col gap-3 w-full md:w-1/3">
          <h3 className="font-semibold text-sm mb-2">Stay Updated</h3>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-neutral-800 text-xs px-3 py-2 rounded focus:outline-none w-full"
            />
            <button type="submit" className="bg-white text-black text-xs px-4 py-2 rounded hover:bg-neutral-200">Subscribe</button>
          </form>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-neutral-300"><BsTwitterX className="text-xl" /></a>
            <a href="#" className="hover:text-neutral-300"><BsLinkedin className="text-xl" /></a>
            <a href="#" className="hover:text-neutral-300"><BsGithub className="text-xl" /></a>
            <a href="#" className="hover:text-neutral-300"><CiMail className="text-xl" /></a>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-neutral-800 my-8"></div>
      <div className="flex justify-between items-center text-xs text-neutral-500">
        <span>© 2025 ThinkLikeDev. All rights reserved.</span>
        <span className="hidden md:block">Built for developers, by developers.</span>
      </div>
    </footer>
  );
};

export default Footer;
