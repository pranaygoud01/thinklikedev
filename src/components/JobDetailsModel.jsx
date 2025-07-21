// JobDetailsModal.jsx
import React from "react";
import { IoMdClose } from "react-icons/io";

const JobDetailsModal = ({ job, show, onClose }) => {
  if (!show || !job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-5 cursor-pointer right-5 text-xl font-bold"
          onClick={onClose}
        ><IoMdClose/></button>
        <div className="flex items-center gap-3 mb-4">
          <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-full border" />
          <div>
            <div className="font-bold text-base">{job.company}</div>
            <div className="text-xs text-neutral-500">{job.location} — {job.type}</div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
        <div className="text-xs text-neutral-400 mb-3">{job.posted}</div>
        <div className="mb-5 text-sm text-neutral-600">
          {job.description || "No description provided."}
        </div>
        <button className="w-full cursor-pointer py-2 bg-[#222] text-white rounded-lg font-semibold hover:bg-black transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsModal;
