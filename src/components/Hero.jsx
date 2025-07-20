import React from "react";

const Hero = () => {
  return (
    <div className="w-full px-10 h-fit">
      <div className="flex w-full gap-10 py-10">
        <div className="w-1/2">
          <h1 className="font-bold leading-14 text-5xl">Discover, Grow, and Land Your Next Opportunity</h1>
        </div>
        <div className="w-1/2">
          <p className="text-neutral-500 text-sm">
            Are you passionate about coding, advancing your tech career, and
            leveling up your developer journey? <span className="text-neutral-900 ">ThinkLikeDev </span>is your all-in-one
            platform to find the latest job opportunities, access valuable free
            resources, and read engaging blogs tailored just for developers.
          </p>
          <button className="text-white mt-5 bg-black px-6 py-2  text-xs">Get Started</button>
        </div>
      </div>
      <div className="h-[60vh] w-full bg-cover bg-center bg-no-repeat"
      style={{backgroundImage:"url('https://images.unsplash.com/photo-1695237115264-1ba2ed594c73?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>

      </div>
    </div>
  );
};

export default Hero;
