import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "5 Productivity Hacks for Busy Developers",
      category: "Productivity",
      date: "2025-07-19",
      image:
        "https://images.unsplash.com/photo-1752834370400-da734c87f565?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Understanding React Server Components",
      category: "Web Development",
      date: "2025-07-15",
      image:
        "https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "How to Use Tailwind CSS Effectively",
      category: "Design",
      date: "2025-07-10",
      image:
        "https://images.unsplash.com/photo-1752805252779-000e9d493b1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Mastering MongoDB Aggregations",
      category: "Backend",
      date: "2025-07-05",
      image:
        "https://images.unsplash.com/photo-1652992386209-afc1f96145f5?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
        <button className="border border-white px-4 py-2 mt-4 md:mt-0">See More</button>
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
              <button className="text-xs w-fit hover:border-b cursor-pointer flex items-center gap-1">
                Read More
                <IoIosArrowRoundForward className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
