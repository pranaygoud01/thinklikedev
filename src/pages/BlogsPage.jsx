import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const BLOGS_PER_PAGE = 8;

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);
      const data = await res.json();
      const formattedBlogs = (data.blogs || []).map(blog => ({
        id: blog._id,
        title: blog.title,
        category: blog.category || "Uncategorized",
        date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        image: blog.image,
        excerpt: blog.excerpt || (blog.content ? blog.content.substring(0, 150) + "..." : ""),
        link: `/blog/${blog._id}`, // Link to single blog route
      }));
      setBlogPosts(formattedBlogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <div className="min-h-screen bg-white flex justify-center items-center text-xl font-medium">Loading blogs...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Crisp Header */}
      <div className="w-full bg-black pt-16 pb-24 flex flex-col items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 pointer-events-none" />
        <h1 className="text-white text-3xl sm:text-5xl font-extrabold mb-4 text-center tracking-tight z-10 drop-shadow-sm">
          Developer Blogs & Guides
        </h1>
        <p className="text-white/90 text-sm sm:text-base max-w-2xl text-center z-10 font-medium">
          Dive into actionable tutorials, dev stories, and tech news curated for your growth.
        </p>
      </div>

      {/* Floating Search Bar */}
      <div className="flex justify-center -mt-8 mb-12 px-5 sm:px-6 relative z-20">
        <div className="w-full max-w-2xl flex items-center border border-black/10 rounded-xl px-4 py-3 sm:py-4 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <CiSearch className="text-black/40 text-2xl sm:text-3xl mr-3 sm:mr-4" />
          <input
            type="text"
            placeholder="Search blogs by title, category, or keywords..."
            className="w-full text-sm sm:text-base focus:outline-none bg-transparent placeholder:text-black/40 text-black font-semibold"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
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
              className="group flex flex-col bg-white border border-black/10 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 h-[420px] sm:h-[440px]"
            >
              <div className="h-44 sm:h-48 w-full overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
              </div>
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
                <Link
                  to={post.link}
                  className="inline-block mt-auto py-1.5 px-4 text-xs font-semibold border border-black text-black rounded hover:bg-black hover:text-white transition w-fit"
                >
                  Read More
                </Link>
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
            className={`p-2 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 transition text-black/70 ${page === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            aria-label="Previous page"
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
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`p-2 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 transition text-black/70 ${page === totalPages ? "opacity-40 cursor-not-allowed" : ""
              }`}
            aria-label="Next page"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}

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

export default BlogsPage;
