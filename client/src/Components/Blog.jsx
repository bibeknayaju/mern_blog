import React from "react";
import { Link } from "react-router-dom";

function Blog({ blogs }) {
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [year, month, day] = formattedDate.split(" ");
    return `${year} ${month} ${day}`;
  }
  return (
    // <div className=" border-gray-200 border bg-allbody text-white flex flex-row">
    <>
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <>
            <div className="text-white flex flex-col cursor-auto pt-4 items-center gap-2">
              <Link to={"/blog/" + blog._id}>
                {blog.photos?.[0] && (
                  <img
                    className=" rounded-2xl aspect-video object-contain h-full"
                    src={"http://localhost:4000/uploads/" + blog.photos?.[0]}
                    alt={blog.title}
                  />
                )}
              </Link>
              <div className="flex flex-col pl-0 ml-[-2.7rem]">
                <Link to={"/blog/" + blog._id}>
                  <h2 className="font-bold text-gray-300 text-xl w-[20rem] truncate">
                    {blog.title}
                  </h2>
                </Link>
                {/* <h6
                    className="text-sm mr-3 
                  text-gray-500 truncate">
                    {blog.summary}
                  </h6> */}

                <div className="m-0">
                  <h3>{blog.owner.name}</h3>
                </div>
                <div className="flex gap-2 ml-0">
                  <h3 className="text-gray-600 text-base">
                    {formatDate(blog.createdAt)}
                  </h3>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
    // </div>
  );
}

export default Blog;
