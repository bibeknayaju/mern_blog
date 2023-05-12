import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Components/Editor";

function EditBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`/blog/${id}`).then((response) => {
      const blogDoc = response.data;
      setTitle(blogDoc.title);
      setDescription(blogDoc.description);
      setSummary(blogDoc.summary);
    });
  }, [id]);

  async function updateBlog(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("summary", summary);
    if (addedPhotos) {
      data.append("updatephotos", addedPhotos[0]);
    }
    const response = await axios.put(`/blog/${id}`, data, {
      credentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      setRedirect(true);
    }
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

  if (redirect) {
    return <Navigate to={`/blog/${id}`} />;
  }
  return (
    <div className="text-white max-w-6xl m-auto">
      <Helmet>
        <title>{"Edit Blog"}</title>
        <meta name="description" content="My Page Description" />
      </Helmet>

      <div>
        <form onSubmit={updateBlog} className="mb-6">
          {preInput("Title", "Update the title of the Blog")}
          <input
            className="text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title of the Blog"
          />

          {preInput("Summary", "Update the summary of the Blog")}
          <textarea
            className="text-white"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            type="text"
            placeholder="Title of the Blog"
          />

          {preInput("Picture", "Update the Picture of the Blog")}
          {/* <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}

          <label className="relative cursor-pointer mb-2 rounded-md font-medium text-gray-100 flex items-center gap-1 justify-center border bg-transparent p-2 text-">
            <span>Select a file</span>
            <input
              className="w-full hidden border rounded-lg py-3 px-4 mb-2"
              onChange={(e) => setAddedPhotos(e.target.files)}
              type="file"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {preInput("Description", "Update the description of the Blog")}
          <Editor value={description} onChange={setDescription} />

          <button
            type="submit"
            className="bg-primary p-2 w-full text-white rounded-2xl mt-9 primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
