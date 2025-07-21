import React from "react";
import { CiViewList } from "react-icons/ci";
import { PiDevToLogoLight } from "react-icons/pi";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

const Feature = () => {
  const features = [
    {
      icon: <CiViewList />,
      title: "Fresh Job Listings",
      description:
        "Explore curated tech job openings—from startups to established enterprises—updated regularly to help you find your next role easily.",
    },
    {
      icon: <PiDevToLogoLight />,
      title: "Expert-Led Blog Content",
      description:
        "Dive into actionable guides, in-demand skill breakdowns, project ideas, and interviews with real-world devs.",
    },
    {
      icon: <IoBookmarksOutline />,
      title: "Exclusive Free Resources",
      description:
        "Unlock tutorials, e-books, cheat sheets, and productivity tools—all free, to supercharge your learning and boost your career.",
    },
    {
      icon: <BsPeople />,
      title: "Community-Driven",
      description:
        "Join a thriving network of developers, share your experiences, and stay ahead with tech trends.",
    },
  ];
  return (
    <div className="w-full min-h-screen py-10 px-4 md:px-10 flex flex-col md:flex-row gap-8">
      {/* Text Section */}
      <div className="md:w-1/2 w-full flex flex-col gap-5 justify-center md:pl-10">
        <p className="text-[9px] text-white bg-black px-2 py-1 w-fit">Unique</p>
        <h1 className="font-semibold text-2xl">
          What Makes ThinkLikeDev Unique?
        </h1>
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((item, index) => (
            <div
              key={index}
              className="text-sm p-5 hover:shadow cursor-pointer flex flex-col gap-1 border border-neutral-300 rounded-xl bg-white"
            >
              <span className="text-2xl">{item.icon}</span>
              <h1 className="mt-4">
                <span className="font-bold">{item.title}</span>
              </h1>
              <p className="text-neutral-500 text-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Image Section */}
      <div className="md:w-1/2 w-full bg-center bg-cover bg-no-repeat p-0 md:p-20 md:pr-10 flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1682687219356-e820ca126c92?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-60 md:h-full object-cover rounded-xl"
          alt="Feature"
        />
      </div>
    </div>
  );
};

export default Feature;
