import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsBuilding, BsGeoAlt } from "react-icons/bs";
import JobDetailsModal from "./JobDetailsModel";
import { Link } from "@tanstack/react-router";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    posted: "2 days ago",
    type: "Full-time",
    logo: "https://avatars.githubusercontent.com/u/6730767?v=4",
  },
  {
    title: "Backend Engineer",
    company: "CloudWare",
    location: "Bangalore",
    posted: "4 days ago",
    type: "Remote",
    logo: "https://avatars.githubusercontent.com/u/69631?v=4",
  },
  {
    title: "DevOps Specialist",
    company: "InfraSys",
    location: "Pune",
    posted: "1 day ago",
    type: "Hybrid",
    logo: "https://avatars.githubusercontent.com/u/17522643?v=4",
  },
  {
    title: "UI/UX Designer",
    company: "CreativeX",
    location: "Delhi",
    posted: "3 days ago",
    type: "Full-time",
    logo: "https://avatars.githubusercontent.com/u/9892522?v=4",
  },
];

const ExploreJobs = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full bg-white max-lg:mt-5 text-black p-4 sm:p-8 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xs px-2 py-1 bg-black text-white w-fit rounded">
            Explore Jobs
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 font-semibold">
            Find Your Next Opportunity
          </p>
        </div>
        <Link to="/findjobs" className="border border-black text-xs sm:text-base px-3 sm:px-4 py-2 rounded hover:bg-neutral-100 transition-all">
          View All Jobs
        </Link>
      </div>
      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between bg-neutral-50 border border-neutral-200 rounded-lg p-4 sm:p-6 hover:shadow transition-all h-auto min-h-[230px] sm:min-h-[250px] md:min-h-[280px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="font-bold text-sm">{job.company}</span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2 break-words">
                {job.title}
              </h2>
              <div className="flex items-center text-xs text-neutral-500 gap-2 mb-1">
                <BsGeoAlt className="mr-1" />
                {job.location}
              </div>
              <div className="flex items-center text-xs text-neutral-500 gap-2">
                <BsBuilding className="mr-1" />
                {job.type}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-neutral-400">{job.posted}</span>
              <button
                className="flex items-center gap-1 text-xs font-medium hover:text-blue-600 hover:underline transition"
                onClick={() => {
                  setSelectedJob(job);
                  setShowModal(true);
                }}
              >
                View Details <IoIosArrowRoundForward className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <JobDetailsModal
        job={selectedJob}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ExploreJobs;
