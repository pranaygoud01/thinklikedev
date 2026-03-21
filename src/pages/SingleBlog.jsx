import React, { useState, useEffect } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { IoIosArrowBack } from "react-icons/io";

const SingleBlog = () => {
  const { id } = useParams({ strict: false });
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  const fetchBlogData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
      if (!res.ok) throw new Error("Blog not found");
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center text-xl font-medium">
        Loading article...
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link to="/blogs" className="text-blue-600 hover:underline">
          Return to Blogs
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      {/* Navigation Top Bar */}
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-10 py-8">
        <Link
          to="/blogs"
          className="inline-flex items-center text-sm font-semibold text-neutral-500 hover:text-black transition-colors"
        >
          <IoIosArrowBack className="mr-1 text-lg" /> Back to all articles
        </Link>
      </div>

      <article className="w-full max-w-4xl mx-auto px-5 sm:px-10">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-6">
            <span className="bg-black/5 px-3 py-1 rounded-full text-black">
              {blog.category || "Uncategorized"}
            </span>
            <span>&bull;</span>
            <span>{blog.readingTime || 5} Min Read</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm font-medium text-neutral-600">
            {blog.author && blog.author.avatar && (
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full bg-neutral-200"
              />
            )}
            <div className="text-left">
              <div className="text-black font-bold">
                {blog.author ? blog.author.name : "ThinkLikeDev Editor"}
              </div>
              <div>{formattedDate}</div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {blog.image && (
          <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-12 shadow-sm border border-black/10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div 
          className="prose prose-lg sm:prose-xl prose-neutral max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:border prose-img:border-black/10"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Tags Section */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-10 mt-16 pt-8 border-t border-black/10">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-bold mr-2 py-1">Tags:</span>
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-neutral-100 text-neutral-700 text-xs font-bold px-3 py-1 rounded hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
