import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../Components/CommentForm";

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);

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

  return (
    <div className="max-w-7xl mb-5 m-auto mt-8 flex flex-col text-white">
      <div className="text-center max-w-4xl mb-2">
        <h1 className="font-Plus_Jakarta_Sans text-[48px] leading-[66px] font-extrabold">
          {blog.title}
        </h1>
      </div>

      <div className="text-gray-500 ">
        {new Date(blog?.createdAt).toLocaleDateString()}
      </div>

      <div className="mb-1">
        <h2 className=" font-semibold">
          by @<span>{blog.owner?.name}</span>
        </h2>
      </div>

      <div className=" ">
        <img
          src={"http://localhost:4000/uploads/" + blog.photos?.[0]}
          alt={blog.title}
          className="h-96 rounded-lg mb-8"
        />
      </div>

      <div className="max-w-3xl m-auto">
        <h4
          className="font-Montserrat text-xl leading-9 font-normal"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>

      <div className="flex items-center justify-center m-auto border-t">
        <CommentForm onCommentCreated={handleCommentCreate} />
      </div>

      <div>
        {filteredComments &&
          filteredComments.length > 0 &&
          filteredComments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BlogPage;
