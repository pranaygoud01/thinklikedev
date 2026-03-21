import React, { useState, useEffect } from "react";
import {
  IoIosArrowRoundForward,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { BsBuilding, BsGeoAlt } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import JobDetailsModal from "../components/JobDetailsModel";

const JOBS_PER_PAGE = 8;

const FindJobs = () => {
  const [mockJobs, setMockJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);
      const data = await res.json();

      // We map the backend job structure to the structure expected by the frontend
      const formattedJobs = (data.jobs || []).map(job => {
        // Simple relative time formatter
        const daysAgo = Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24));
        const posted = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;

        return {
          ...job, // keep original details for the modal
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          posted: posted,
          type: job.type,
          logo: job.logo,
          description: job.description
        };
      });
      setMockJobs(formattedJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (loading) {
    return <div className="min-h-screen bg-white flex justify-center items-center text-xl font-medium">Loading opportunities...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Crisp Header */}
      <div className="w-full bg-black pt-16 pb-20 flex flex-col items-center justify-center px-4 relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 pointer-events-none" />
        <h1 className="text-white text-3xl sm:text-5xl font-extrabold mb-4 text-center tracking-tight z-10 drop-shadow-sm">
          Find Your Next Tech Opportunity
        </h1>
        <p className="text-white/90 text-sm sm:text-base text-center max-w-2xl z-10 font-medium px-2">
          Curated roles, real companies, updated often. Start applying today.
        </p>
      </div>
      {/* Main Content */}
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-10">
        {/* Results count and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 mt-4">
          <div className="flex w-full md:w-2/3 lg:w-1/2 items-center rounded-xl border border-black/10 px-4 py-3 bg-white shadow-sm focus-within:shadow-md focus-within:border-black transition-all">
            <CiSearch className="text-black/40 text-2xl mr-3" />
            <input
              type="text"
              className="w-full text-base outline-none bg-transparent placeholder:text-black/40 text-black font-semibold"
              placeholder="Search jobs, companies, or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="text-black/60 text-sm font-semibold bg-black/5 px-4 py-2 rounded-lg">
            {filteredJobs.length} jobs found
          </span>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-10">
          {currentJobs.length === 0 && (
            <div className="col-span-full text-center text-neutral-400 py-12">
              No jobs found matching your search.
            </div>
          )}
          {currentJobs.map((job, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between bg-white border border-black/10 rounded-2xl p-5 sm:p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-black/10 shadow-sm"
                  />
                  <span className="font-bold text-sm text-black/80">{job.company}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 leading-tight text-black group-hover:text-black/60 transition-colors">
                  {job.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center text-xs font-medium bg-black/5 text-black/70 px-2.5 py-1 rounded-md">
                    <BsGeoAlt className="mr-1.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center text-xs font-medium bg-black/5 text-black/70 px-2.5 py-1 rounded-md">
                    <BsBuilding className="mr-1.5" />
                    {job.type}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-medium text-black/40">{job.posted}</span>
                <button
                  className="flex items-center gap-1 text-xs font-bold text-black hover:text-black/60 hover:underline transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                    setShowModal(true);
                  }}
                >
                  View Details <IoIosArrowRoundForward className="text-lg group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`p-2 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 transition text-black/70 ${page === 1 ? "opacity-40 cursor-default" : ""
                }`}
            >
              <IoIosArrowBack />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${page === i + 1
                  ? "bg-black text-white border-black"
                  : "bg-white border-black/20 text-black hover:bg-black/5"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`p-2 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 transition text-black/70 ${page === totalPages ? "opacity-40 cursor-default" : ""
                }`}
            >
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>
      {/* Newsletter CTA Component */}
      <div className="w-full max-w-5xl mx-auto mt-6 mb-20 px-5 sm:px-10">
        <div className="bg-black/5 border border-black/10 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Stay in the loop</h2>
            <p className="text-black/60 text-sm sm:text-base max-w-md font-medium">Get the freshest dev news, exclusive jobs, and insights delivered straight to your inbox.</p>
          </div>
          <div className="flex max-lg:flex-wrap w-full md:w-auto max-w-md gap-3">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 text-sm sm:text-base border border-black/20 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-medium" />
            <button className="bg-black text-white px-6 py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-black/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Subscribe</button>
          </div>
        </div>
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
