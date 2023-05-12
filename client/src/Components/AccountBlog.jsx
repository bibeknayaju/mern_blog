import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";

function AccountBlog({ blog }) {
  return (
    <div className="h-fit">
      <Link to={`/blog/${blog._id}`}>
        <img
          alt={blog.title}
          className="aspect-video object-contain h-full"
          src={"http://localhost:4000/uploads/" + blog.photos[0]}
        />
      </Link>
      <Link to={`/blog/${blog._id}`}>
        <h3 className="text-xl font-Montserrat font-bold mt-2 truncate">
          {blog.title}
        </h3>
      </Link>
      <p className="text-gray-300 text-sm">
        {new Date(blog?.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

export default AccountBlog;
