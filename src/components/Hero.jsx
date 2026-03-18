import { Link } from "@tanstack/react-router";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = () => {
  return (
    <div className="relative w-full px-4 sm:px-8 md:px-10 py-12 md:py-20 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background glow for a modern aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-neutral-200/50 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      {/* Modern Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium border border-black/10 rounded-full bg-white text-black/70">
        <span className="flex h-2 w-2 rounded-full bg-black animate-pulse"></span>
        Platform is Live
      </div>

      {/* Main Headline */}
      <h1 className="max-w-4xl font-extrabold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl text-neutral-900 mb-6">
        Discover, Grow, and <br className="hidden md:block" /> Land Your Next Opportunity
      </h1>

      {/* Concise Description */}
      <p className="max-w-2xl text-black/60 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
        Your all-in-one platform to find the latest <strong className="font-semibold text-black">job opportunities</strong>,
        access valuable free <strong className="font-semibold text-black">resources</strong>, and read engaging <strong className="font-semibold text-black">blogs</strong> tailored just for developers.
      </p>

      {/* Primary and Secondary CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/findjobs"
          className="flex items-center gap-2 text-white bg-black px-6 py-3 text-sm font-medium rounded-lg hover:bg-black/80 transition shadow-lg shadow-black/20"
        >
          Explore Jobs <IoIosArrowRoundForward className="text-xl" />
        </Link>
        <Link
          to="/blogs"
          className="flex items-center gap-2 text-black/70 bg-white border border-black/10 px-6 py-3 text-sm font-medium rounded-lg hover:bg-black/5 transition"
        >
          Read Our Blogs
        </Link>
      </div>
    </div>
  );
};

export default Hero;
