// src/components/FreeResources.jsx
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import { BsBook, BsCode, BsPlug, BsFilm } from "react-icons/bs";

// Controls how many show per page
const RESOURCES_PER_PAGE = 8;
const resourceTypes = ["All", "Course", "E-Book", "Tool"];

const FreeResources = () => {
  const [resourceList, setResourceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/resources`);
      const data = await res.json();

      const getIcon = (type) => {
        if (type === 'Course') return <BsCode />;
        if (type === 'E-Book') return <BsBook />;
        if (type === 'Tool') return <BsPlug />;
        return <BsBook />; // default
      };

      const formattedResources = (data.resources || []).map(res => ({
        id: res._id,
        title: res.title,
        type: res.type,
        categoryIcon: getIcon(res.type),
        link: res.link,
        description: res.description,
        image: res.image
      }));
      setResourceList(formattedResources);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  const filteredResources =
    typeFilter === "All"
      ? resourceList
      : resourceList.filter((r) => r.type === typeFilter);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredResources.length / RESOURCES_PER_PAGE)
  );
  const currentResources = filteredResources.slice(
    (page - 1) * RESOURCES_PER_PAGE,
    page * RESOURCES_PER_PAGE
  );

  // Ensures page doesn't get out of bounds
  React.useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
  }, [typeFilter, totalPages, page]);

  if (loading) {
    return <div className="min-h-screen bg-white flex justify-center items-center text-xl font-medium">Loading resources...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Crisp Header */}
      <header className="w-full bg-black pt-16 pb-24 flex flex-col items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 pointer-events-none" />
        <h1 className="text-white text-3xl sm:text-5xl font-extrabold mb-4 text-center tracking-tight z-10 drop-shadow-sm">
          Free Developer Resources
        </h1>
        <p className="text-white/90 text-sm sm:text-base max-w-2xl text-center z-10 font-medium">
          Discover high-quality free courses, e-books, and productivity tools to boost your developer journey. Curated and regularly updated for you!
        </p>
      </header>

      {/* Floating Filter Controls */}
      <section className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4 sm:px-6 -mt-8 mb-12 relative z-20">
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/10">
          {resourceTypes.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTypeFilter(t);
                setPage(1);
              }}
              className={`px-5 py-2 text-xs sm:text-sm rounded-xl font-bold focus:outline-none transition-all duration-300
                  ${typeFilter === t
                  ? "bg-black text-white shadow-md transform scale-105"
                  : "bg-transparent text-black/60 hover:bg-black/5 hover:text-black"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Resources Grid */}
      <main className="mx-auto w-full  grid gap-6 sm:gap-7 px-10 max-lg:px-5 sm:px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-10">
        {currentResources.map((res, i) => (
          <div
            key={i}
            className="group flex flex-col bg-white border border-black/10 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 h-[430px]"
          >
            <div className="h-44 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                style={{ backgroundImage: `url(${res.image})` }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2 mb-3 text-black/60 font-medium text-xs">
                  <span className="text-lg text-black">{res.categoryIcon}</span>
                  <span className="tracking-wide uppercase">{res.type}</span>
                </div>
                <h2 className="text-lg font-bold mb-2 text-black group-hover:text-black/60 transition-colors line-clamp-2 leading-tight">{res.title}</h2>
                <p className="text-sm text-black/70 mb-4 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>
              </div>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-auto py-2.5 px-4 text-xs font-bold border border-black text-black rounded-xl hover:bg-black hover:text-white transition-all w-fit group-hover:shadow-md"
              >
                Open Resource <IoIosArrowRoundForward className="text-lg group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
        {currentResources.length === 0 && (
          <div className="col-span-full py-16 text-lg text-center text-neutral-400">
            No resources found.
          </div>
        )}
      </main>

      {/* Pagination */}
      <nav className="flex justify-center items-center gap-1 mb-7 flex-wrap">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`p-2 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 transition text-black/70
            ${page === 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
            }`}
          aria-label="Previous Page"
        >
          <IoIosArrowBack size={20} />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border transition
              ${page === i + 1
                ? "bg-black text-white border-black"
                : "bg-white border-black/20 text-black hover:bg-black/5"
              }`}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`p-2 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 transition text-black/70
            ${page === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer"
            }`}
          aria-label="Next Page"
        >
          <IoIosArrowForward size={20} />
        </button>
      </nav>

      {/* Newsletter CTA Component */}
      <div className="w-full max-w-5xl mx-auto mt-6 mb-20 px-5 sm:px-10">
        <div className="bg-black/5 border border-black/10 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Stay in the loop</h2>
            <p className="text-black/60 text-sm sm:text-base max-w-md font-medium">Get the freshest dev news, exclusive guides, and insights delivered straight to your inbox.</p>
          </div>
          <div className="flex w-full max-lg:flex-wrap md:w-auto max-w-md gap-3">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 text-sm sm:text-base border border-black/20 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-medium" />
            <button className="bg-black text-white px-6 py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-black/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeResources;
