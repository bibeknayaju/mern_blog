import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Blog from "../Components/Blog";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  return (
    <>
      <Blog blogs={blogs} />
    </>
  );
}

export default Home;
