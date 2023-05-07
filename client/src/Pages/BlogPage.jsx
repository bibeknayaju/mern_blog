import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../Components/CommentForm";
import { UserContext } from "../UserContext";
import { Helmet } from "react-helmet";

function BlogPage() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/blog/${id}`).then((response) => {
      setBlog(response.data);
    });
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/blog/${id}/comment`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  // for handle the comment
  const handleCommentCreate = (comment) => {
    setComments([...comments, comment]);
  };

  // /for filtering the comment
  const filteredComments = comments.filter(
    (comment) => comment.blog?.toString() === id.toString()
  );

  const deleteBlog = (id) => {
    const data = axios.delete(`/blog/${id}/`);
    setRedirect(true);
    if (data) {
      setBlog([]);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="max-w-7xl mb-5 m-auto mt-8 flex flex-col text-white">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content="My Page Description" />
      </Helmet>

      <div className="max-w-4xl m-auto">
        <img
          src={"http://localhost:4000/uploads/" + blog.photos?.[0]}
          alt={blog.title}
          className="h-[30rem] rounded-lg mb-8"
        />
      </div>
      <div className="text-center max-w-4xl mb-2 m-auto">
        <h1 className="font-Plus_Jakarta_Sans text-[48px] leading-[66px] font-extrabold">
          {blog.title}
        </h1>
      </div>

      <div className="text-center max-w-4xl mb-2 m-auto">
        <h6 className="font-Plus_Jakarta_Sans text-2xl leading-[31px] my-3 font-medium text-gray-400">
          {blog.summary}
        </h6>
      </div>

      <div className="flex m-auto mb-3 items-center gap-2 text-center">
        <div className="flex flex-row items-center gap-3">
          <img
            className="h-12 rounded-full"
            src={"http://localhost:4000/userphotos/" + blog.owner?.photos[0]}
            alt={blog.owner?.name}
          />

          <h2 className=" font-semibold">
            <span>{blog.owner?.name}</span>
          </h2>
        </div>
        <div className="text-gray-500 ">
          <span>· </span>
          {new Date(blog?.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="flex justify-center my-3">
        {user?._id === blog.owner?._id && (
          <div className="gap-3 flex">
            <div>
              <Link className="flex gap-2" to={`/edit/${blog._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit this post
              </Link>
            </div>
            <div>
              <button
                onClick={() => deleteBlog(blog?._id)}
                className="flex gap-2 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span>Delete Blog</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-3xl m-auto">
        <h4
          className="font-Montserrat text-xl leading-9 font-normal"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>

      <div className="flex items-center justify-center m-auto">
        <CommentForm onCommentCreated={handleCommentCreate} />
      </div>

      <div className="max-w-6xl mt-4 m-auto ">
        {filteredComments &&
          filteredComments.length > 0 &&
          filteredComments.map((comment) => (
            <>
              <div className="flex gap-3 mb-5 w-[34rem]">
                {comment.author.photos?.[0] ? (
                  <div>
                    <img
                      className="h-12 rounded-full "
                      src={
                        "http://localhost:4000/userphotos/" +
                        comment.author.photos?.[0]
                      }
                      alt={comment.author.name}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      className="h-12 rounded-full "
                      src={
                        "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
                      }
                      alt={comment.author.name}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h4 className="font-Plus_Jakarta_Sans font-extrabold text-gray-200">
                      {comment.author.name}
                      {" · "}
                    </h4>

                    <p className="text-gray-400">
                      {"  "}
                      {new Date(comment?.createdAt).toDateString()}
                    </p>
                  </div>
                  <div key={comment._id}>
                    <p className="font-Montserrat">{comment.comment}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default BlogPage;
