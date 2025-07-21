import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsBook, BsCode, BsPlug, BsFilm } from "react-icons/bs";

// Mock resource data
const resourceList = [
  {
    title: "JavaScript Essentials (Course)",
    type: "Course",
    categoryIcon: <BsCode />,
    link: "#",
    description: "Master JavaScript with hands-on video tutorials and projects.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Developer Productivity Cheatsheet",
    type: "E-Book",
    categoryIcon: <BsBook />,
    link: "#",
    description: "A concise guide to speed up your workflow as a coder.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Open-Source CLI Tools",
    type: "Tool",
    categoryIcon: <BsPlug />,
    link: "#",
    description: "A curated collection of must-have developer CLI utilities.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Responsive Web Design (Course)",
    type: "Course",
    categoryIcon: <BsFilm />,
    link: "#",
    description: "Free video course to make websites work on any device.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Python Crash Guide",
    type: "E-Book",
    categoryIcon: <BsBook />,
    link: "#",
    description: "Quickly pick up the Python basics and syntax.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "GitHub Actions Toolkit",
    type: "Tool",
    categoryIcon: <BsPlug />,
    link: "#",
    description: "Boost CI/CD workflows with ready-to-use GitHub Actions.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
  },
  // ...add more as needed
];

const RESOURCES_PER_PAGE = 8;
const resourceTypes = ["All", "Course", "E-Book", "Tool"];

const FreeResources = () => {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredResources =
    typeFilter === "All"
      ? resourceList
      : resourceList.filter(r => r.type === typeFilter);

  const totalPages = Math.ceil(filteredResources.length / RESOURCES_PER_PAGE);
  const currentResources = filteredResources.slice(
    (page - 1) * RESOURCES_PER_PAGE,
    page * RESOURCES_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="w-full bg-black py-16 flex flex-col items-center mb-8 px-4">
        <h1 className="text-white text-4xl font-bold mb-3">
          Free Developer Resources
        </h1>
        <p className="text-neutral-300 text-base max-w-xl text-center">
          Discover high-quality free courses, e-books, and productivity tools to boost your developer journey. Curated and regularly updated for you!
        </p>
      </div>

      {/* Filter Controls */}
      <div className="w-full mx-auto px-10 flex gap-3 mb-8">
        {resourceTypes.map(t => (
          <button
            key={t}
            onClick={() => { setTypeFilter(t); setPage(1); }}
            className={`px-4 py-2 text-xs cursor-pointer rounded border font-medium transition
              ${typeFilter === t
                ? "bg-black text-white border-black"
                : "bg-white border-neutral-300 text-black hover:bg-neutral-100"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="w-full mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {currentResources.map((res, i) => (
          <div
            key={i}
            className="flex flex-col bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden hover:shadow transition h-[400px]"
          >
            <div
              className="h-40 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${res.image})` }}
            />
            <div className="flex-1 flex flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2 mb-2 text-neutral-600 text-xs">
                  <span className="text-lg">{res.categoryIcon}</span>
                  <span>{res.type}</span>
                </div>
                <h2 className="text-lg font-semibold mb-1 leading-tight">{res.title}</h2>
                <p className="text-xs text-neutral-700 mb-4 line-clamp-3">{res.description}</p>
              </div>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto py-2 px-4 text-xs font-semibold border border-black rounded hover:bg-black hover:text-white transition w-fit"
              >
                Open Resource
              </a>
            </div>
          </div>
        ))}
        {currentResources.length === 0 && (
          <div className="col-span-full py-16 text-lg text-center text-neutral-400">No resources found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`p-2 rounded-full border bg-neutral-100 hover:bg-neutral-200 transition ${page === 1 ? "opacity-40 cursor-default" : ""}`}
        >
          <IoIosArrowBack />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${page === i + 1 ? "bg-black text-white border-black" : "bg-white border-neutral-300 text-black hover:bg-neutral-100"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`p-2 rounded-full border bg-neutral-100 hover:bg-neutral-200 transition ${page === totalPages ? "opacity-40 cursor-default" : ""}`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default FreeResources;
