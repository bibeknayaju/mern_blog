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

  return (
    <div className="max-w-5xl m-auto">
      <Helmet>
        <title>My Blog</title>
        <meta name="description" content="My Page Description" />
      </Helmet>
      <Main />

      <About />
      <Blog key={blogs.id} blogs={blogs} />
    </div>
  );
}

export default Home;
