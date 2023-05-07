import React from "react";
import PhotoUploader from "../Components/PhotoUploader";
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Editor from "../Components/Editor";

function CreateBlog() {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");

  // for creating the blog in the database
  async function saveBlogs(e) {
    e.preventDefault();
    const blogData = {
      title,
      description,
      addedPhotos,
      summary,
    };

    await axios.post("/blogs", blogData);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  return (
    <div className="text-white max-w-6xl m-auto">
      <Helmet>
        <title>{"Create Blog"}</title>
        <meta name="description" content="My Page Description" />
      </Helmet>
      <form onSubmit={saveBlogs}>
        {preInput("Title", "Title of the Blog")}
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title of the Blog"
        />

        {preInput("Summary", "Summary of the Blog")}
        <input
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          type="text"
          placeholder="Summary of the Blog"
        />

        {preInput("Description", "Description of the Blog")}
        {/* <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}

        <Editor value={description} onChange={setDescription} />

        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <button className="bg-primary p-2 w-full text-white rounded-2xl mt-9 primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
