import React from "react";
import { Link } from "react-router-dom";

function Main({ blogs }) {
  return (
    <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-3 p-4 md:p-2 lg:p-2 gap-5 mb-9 max-w-6xl m-auto mt-7 text-white">
      {/* Left Div */}
      <div className="col-span-2">
        <Link to={"/blog/" + blogs[0]?._id}>
          <img
            className=" rounded-2xl object-contain h-80 md:h-fit lg:h-fit"
            src={"http://localhost:4000/uploads/" + blogs[0]?.photos?.[0]}
            alt={blogs[0]?.title}
          />
        </Link>
        <Link to={"/blog/" + blogs[0]?._id}>
          <h2 className="text-xl font-bold mt-2">{blogs[0]?.title}</h2>
        </Link>
        <Link to={"/blog/" + blogs[0]?._id}>
          <p className="text-gray-400 max-w-md mt-1 truncate">
            {blogs[0]?.summary}
          </p>
        </Link>

        <div className="flex items-center mt-2 truncate">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={
              "http://localhost:4000/userphotos/" + blogs[0]?.owner?.photos[0]
            }
            alt={blogs[0]?.owner?.name}
          />
          <div className="flex items-center gap-3 text-center">
            <p className="font-medium text-gray-300">{blogs[0]?.owner?.name}</p>
            <p className="text-gray-400 text-sm">
              <span>· </span>

              {new Date(blogs[0]?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Right Div 1 */}
      <div className="flex flex-col gap-2">
        <div className="col-span-1">
          <Link to={"/blog/" + blogs[1]?._id}>
            <img
              className=" object-contain  h-80 md:h-fit lg:h-fit"
              src={"http://localhost:4000/uploads/" + blogs[1]?.photos?.[0]}
              alt={blogs[1]?.title}
            />
          </Link>
          <Link to={"/blog/" + blogs[1]?._id}>
            <h2 className="text-xl font-bold mt-2 truncate">
              {blogs[1]?.title}
            </h2>
          </Link>

          <div className="flex items-center mt-2 truncate">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={
                "http://localhost:4000/userphotos/" + blogs[1]?.owner?.photos[0]
              }
              alt="Blogger Avatar"
            />
            <div className="flex items-center gap-3 text-center">
              <p className="font-medium text-gray-300">
                {blogs[1]?.owner?.name}
              </p>
              <p className="text-gray-400 text-sm">
                <span>· </span>
                {new Date(blogs[1]?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Right Div 2 */}
        <div className="col-span-1">
          <Link to={"/blog/" + blogs[2]?._id}>
            <img
              className=" rounded-2xl object-contain sm:h-80 aspect-video md:h-fit lg:h-fit"
              src={"http://localhost:4000/uploads/" + blogs[2]?.photos?.[0]}
              alt={blogs[2]?.title}
            />
          </Link>
          <Link to={"/blog/" + blogs[1]?._id}>
            <h2 className="text-xl max-w-md md:max-w-none lg:max-w-none font-bold mt-2 truncate">
              {blogs[2]?.title}
            </h2>
          </Link>

          <div className="flex items-center mt-2 truncate">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src={
                "http://localhost:4000/userphotos/" + blogs[2]?.owner?.photos[0]
              }
              alt="Blogger Avatar"
            />
            <div className="flex items-center gap-3 text-center">
              <p className="font-medium text-gray-300">
                {blogs[2]?.owner?.name}
              </p>
              <p className="text-gray-400 text-sm">
                <span>· </span>
                {new Date(blogs[2]?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
