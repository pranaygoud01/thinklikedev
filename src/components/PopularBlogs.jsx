import { Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const PopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs?limit=4`);
      const data = await res.json();
      
      const formattedBlogs = (data.blogs || []).slice(0, 4).map(blog => ({
        id: blog._id,
        title: blog.title,
        category: blog.category || "Uncategorized",
        date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        image: blog.image,
      }));
      setBlogs(formattedBlogs);
    } catch (error) {
      console.error("Failed to fetch latest blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 text-white bg-black p-5 max-lg:pt-10 md:p-8 lg:p-10 h-fit">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xs px-2 text-black py-1 w-fit bg-white">Latest Blogs</h1>
          <p className="text-2xl md:text-3xl lg:text-4xl mt-3">
            Finish What you started today
            <br /> Before you forget to do it.
          </p>
        </div>
        <Link to="/blogs" className="border text-xs md:text-sm rounded-md border-white px-4 py-2 mt-4 md:mt-0">See More</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 lg:mt-10 gap-6 lg:gap-8">
        {blogs.map((item, index) => (
          <div
            className="w-full flex p-2 md:p-3 cursor-pointer items-end h-[320px] sm:h-[340px] md:h-[400px] lg:h-[450px] rounded-md bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
            key={index}
          >
            <div className="w-full p-4 md:p-5 flex flex-col gap-3 bg-black/60 rounded-md h-fit">
              <h1 className="text-neutral-200 uppercase text-xs">
                {item.category} . <span>{item.date}</span>
              </h1>
              <p className="font-semibold text-white line-clamp-3 text-lg md:text-xl">
                {item.title}
              </p>
              <Link 
                to={`/blog/${item.id}`} 
                className="text-xs w-fit hover:border-b cursor-pointer flex items-center gap-1"
              >
                Read More
                <IoIosArrowRoundForward className="text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
