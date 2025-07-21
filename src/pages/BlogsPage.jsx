import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

// Mock blog data
const blogPosts = [
  {
    title: "5 Productivity Hacks for Busy Developers",
    category: "Productivity",
    date: "2025-07-19",
    image: "https://images.unsplash.com/photo-1752834370400-da734c87f565?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Boost your workflow with actionable productivity tips made just for coders. From setting daily priorities to using the right tools, these hacks will keep you ahead.",
    link: "#",
  },
  {
    title: "Understanding React Server Components",
    category: "Web Development",
    date: "2025-07-15",
    image: "https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?q=80&w=1170&auto=format&fit=crop",
    excerpt: "Get to grips with the next evolution in React. Learn how server components work, when to use them, and how they fit into modern frontend architectures.",
    link: "#",
  },
  {
    title: "How to Use Tailwind CSS Effectively",
    category: "Design",
    date: "2025-07-10",
    image: "https://images.unsplash.com/photo-1752805252779-000e9d493b1f?q=80&w=1170&auto=format&fit=crop",
    excerpt: "Transform your UI workflow! Discover practical Tailwind strategies for building flexible and maintainable user interfaces as a developer-designer.",
    link: "#",
  },
  {
    title: "Mastering MongoDB Aggregations",
    category: "Backend",
    date: "2025-07-05",
    image: "https://images.unsplash.com/photo-1652992386209-afc1f96145f5?q=80&w=1112&auto=format&fit=crop",
    excerpt: "Go beyond CRUD! Learn aggregation pipelines with real-world use cases to supercharge your MongoDB experience and solve complex data queries.",
    link: "#",
  },
  // ...add more blog objects as needed
];

const BLOGS_PER_PAGE = 8;

const BlogsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredBlogs = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const currentBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <div className="w-full bg-black py-12 sm:py-16 flex flex-col items-center mb-6 px-3 sm:px-4">
        <h1 className="text-white text-xl sm:text-4xl font-bold mb-2 text-center">
          Developer Blogs & Guides
        </h1>
        <p className="text-neutral-300 text-sm max-w-xl text-center">
          Dive into actionable tutorials, dev stories, and tech news curated for your growth.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8 px-5 sm:px-6">
        <div className="w-full max-w-xl flex items-center border border-neutral-300 rounded-lg px-3 py-2 bg-white shadow-sm">
          <CiSearch className="text-neutral-500 text-xl mr-2" />
          <input
            type="text"
            placeholder="Search blogs by title, category, or keywords..."
            className="w-full text-sm focus:outline-none bg-transparent"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to first page on search
            }}
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="w-full flex flex-col items-center px-5 sm:px-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 mb-12">
          {currentBlogs.map((post, i) => (
            <div
              key={i}
              className="flex flex-col bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden hover:shadow transition h-[420px] sm:h-[440px]"
            >
              <div
                className="h-40 sm:h-44 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="text-neutral-500 text-xs uppercase mb-1">
                    {post.category} &nbsp;|&nbsp; {post.date}
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-neutral-700 mb-2 sm:mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <a
                  href={post.link}
                  className="inline-block mt-auto py-1.5 px-4 text-xs font-semibold border border-black rounded hover:bg-black hover:text-white transition w-fit"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
          {currentBlogs.length === 0 && (
            <div className="col-span-full py-16 text-lg text-center text-neutral-400">
              No blogs found.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-10 sm:mb-12">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`p-2 rounded-full border bg-neutral-100 hover:bg-neutral-200 transition ${
              page === 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
            aria-label="Previous page"
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
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`p-2 rounded-full border bg-neutral-100 hover:bg-neutral-200 transition ${
              page === totalPages ? "opacity-40 cursor-not-allowed" : ""
            }`}
            aria-label="Next page"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
