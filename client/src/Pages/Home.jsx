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

  useEffect(() => {
    axios.get("/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const mainBlogs = blogs.slice(0, 3);
  console.log("ONLY THREE", mainBlogs);
  const otherBlogs = blogs.slice(3);
  console.log("ONLY OTHER", otherBlogs);

  return (
    <div>
      <Helmet>
        <title>Bibek Nayaju - My Blog</title>
        <meta name="description" content="My Page Description" />
      </Helmet>
      <Main blogs={mainBlogs} />

      <About />
      <div className=" grid p-4 mg:p-0 lg:p-0 sm:grid-col-1 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-6xl m-auto">
        <Blog key={blogs.id} blogs={otherBlogs} />
      </div>
    </div>
  );
}

export default Home;
