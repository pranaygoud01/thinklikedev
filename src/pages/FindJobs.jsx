import React, { useState, useEffect } from "react";
import {
  IoIosArrowRoundForward,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { BsBuilding, BsGeoAlt } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import JobDetailsModal from "../components/JobDetailsModel";

// Mock job data with description for the modal
const mockJobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    posted: "2 days ago",
    type: "Full-time",
    logo: "https://avatars.githubusercontent.com/u/6730767?v=4",
    description:
      "As a Frontend Developer at TechNova, you'll build innovative UIs with React, collaborate with product designers, and deliver seamless experiences.",
  },
  {
    title: "Backend Engineer",
    company: "CloudWare",
    location: "Bangalore",
    posted: "4 days ago",
    type: "Remote",
    logo: "https://avatars.githubusercontent.com/u/69631?v=4",
    description:
      "Join our backend team to develop scalable APIs, work with cloud microservices, and ensure high performance applications.",
  },
  {
    title: "DevOps Specialist",
    company: "InfraSys",
    location: "Pune",
    posted: "1 day ago",
    type: "Hybrid",
    logo: "https://avatars.githubusercontent.com/u/17522643?v=4",
    description:
      "Implement CI/CD pipelines, automate infrastructure, and support platform reliability as a DevOps Specialist at InfraSys.",
  },
  {
    title: "UI/UX Designer",
    company: "CreativeX",
    location: "Delhi",
    posted: "3 days ago",
    type: "Full-time",
    logo: "https://avatars.githubusercontent.com/u/9892522?v=4",
    description:
      "Design beautiful digital products, conduct user research, and create wireframes for high-impact solutions.",
  },
  {
    title: "React Native Specialist",
    company: "AppLab",
    location: "Mumbai",
    posted: "Today",
    type: "Remote",
    logo: "https://avatars.githubusercontent.com/u/17189275?v=4",
    description:
      "Build cross-platform mobile experiences with React Native and collaborate with world-class product teams.",
  },
  {
    title: "Full Stack Developer",
    company: "Stackly",
    location: "Remote",
    posted: "5 days ago",
    type: "Full-time",
    logo: "https://avatars.githubusercontent.com/u/32763507?v=4",
    description:
      "Work on frontend and backend to create fully integrated web applications and lead project implementation.",
  },
  {
    title: "Data Scientist",
    company: "Analytica",
    location: "Chennai",
    posted: "Yesterday",
    type: "Hybrid",
    logo: "https://avatars.githubusercontent.com/u/38437257?v=4",
    description:
      "Analyze large datasets, build ML models, and drive business insights with data at Analytica.",
  },
  {
    title: "Product Manager",
    company: "NextGen",
    location: "Remote",
    posted: "1 week ago",
    type: "Full-time",
    logo: "https://avatars.githubusercontent.com/u/17446879?v=4",
    description:
      "Define product vision and strategy, lead cross-functional teams, and launch innovative products to market.",
  },
  // Repeat as needed...
];

const JOBS_PER_PAGE = 8;



const FindJobs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter jobs based on search term
  const filteredJobs = mockJobs.filter((job) =>
    [job.title, job.company, job.location]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIdx = (page - 1) * JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIdx, startIdx + JOBS_PER_PAGE);

  // Reset to page 1 on search
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-white text-black px-0 py-0">
      {/* Header */}
      <div className="w-full bg-black py-16 px-0 flex flex-col items-center justify-center mb-8">
        <h1 className="text-white text-4xl font-bold mb-2">
          Find Your Next Tech Opportunity
        </h1>
        <p className="text-neutral-300 text-sm">
          Curated roles, real companies, updated often. Start applying today.
        </p>
      </div>
      {/* Main Content */}
      <div className="w-full mx-auto px-10">
        {/* Results count and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex w-1/2 items-center rounded-lg border border-neutral-300 px-4 py-2">
            <CiSearch className="text-neutral-500 mr-2" />
            <input
              type="text"
              className="w-full text-sm outline-0"
              placeholder="Search jobs, companies, or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="text-neutral-700 text-sm font-semibold">
            {filteredJobs.length} jobs found
          </span>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentJobs.length === 0 && (
            <div className="col-span-full text-center text-neutral-400 py-12">
              No jobs found matching your search.
            </div>
          )}
          {currentJobs.map((job, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between bg-neutral-50 border border-neutral-200 rounded-xl p-6 hover:shadow transition h-[310px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="font-bold text-sm">{job.company}</span>
                </div>
                <h2 className="text-lg font-semibold mb-2 leading-tight">
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

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`p-2 rounded-full border bg-neutral-100 hover:bg-neutral-200 transition ${
                page === 1 ? "opacity-40 cursor-default" : ""
              }`}
            >
              <IoIosArrowBack />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${
                  page === i + 1
                    ? "bg-black text-white border-black"
                    : "bg-white border-neutral-300 text-black hover:bg-neutral-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`p-2 rounded-full border bg-neutral-100 hover:bg-neutral-200 transition ${
                page === totalPages ? "opacity-40 cursor-default" : ""
              }`}
            >
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>
      {/* Job Detail Modal */}
      <JobDetailsModal
        job={selectedJob}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default FindJobs;
