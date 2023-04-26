import React from "react";

function CreateBlog() {
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
    <div className="">
      <form onSubmit={true}>
        {preInput("Title", "Title of the Blog")}
        <input type="text" placeholder="Title of the Blog" />

        {preInput("Description", "Description of the Blog")}
        <textarea />
        <div className="mt-3 gap-2 grid gird-col-6 md:grid-cols-6 lg:grid-cols-6">
          <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
            <input type="file" multiple className="hidden" />
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
            Upload
          </label>
        </div>

        <button className="bg-primary p-2 w-full text-white rounded-2xl primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
