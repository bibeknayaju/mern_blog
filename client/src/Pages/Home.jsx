import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Blog from "../Components/Blog";
import { Helmet } from "react-helmet";
import About from "../Components/About";
import Main from "../Components/Main";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/blogs").then((response) => {
      setBlogs(response.data);
      setLoading(false);
    });
  }, []);

  const mainBlogs = blogs.slice(0, 3);
  const otherBlogs = blogs.slice(3);

  return (
    <div>
      <Helmet>
        <title>My Blog</title>
        <meta name="description" content="My Page Description" />
      </Helmet>

      {loading ? (
        <div className="mt-7">
          <h2 className="text-center text-white text-3xl font-Montserrat ">
            Loading....
          </h2>
        </div>
      ) : (
        <>
          {mainBlogs.length === 0 ? (
            ""
          ) : (
            <Main key={blogs.id} blogs={mainBlogs} />
          )}

          <About />
          <div className=" grid p-4 mg:p-0 lg:p-0 sm:grid-col-1 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-6xl m-auto">
            <Blog key={blogs.id} blogs={otherBlogs} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
