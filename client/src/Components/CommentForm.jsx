import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

function CommentForm({ onCommentCreated }) {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [response, setResponse] = useState([]);

  // for user
  const { user } = useContext(UserContext);

  const saveComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/blog/${id}/comment`, { comment });
      setResponse(response.data);
      onCommentCreated(response.data);
      setComment("");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className=" bottom-3 max-w-4xl m-auto border px-3 md:px-2 py-2 rounded-2xl border-transparent mt-6 flex">
      <form onSubmit={saveComment}>
        {user ? (
          <div className="flex gap-3">
            {user.length > 0 ? (
              <div className="m-0 mt-2">
                <img
                  src={"http://localhost:4000/userphotos/" + user?.photos?.[0]}
                  alt={user?.name}
                  className="h-12 rounded-full"
                />{" "}
              </div>
            ) : (
              <div className="m-0 mt-2">
                <img
                  src={
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
                  }
                  alt={user?.name}
                  className="h-12 rounded-full"
                />{" "}
              </div>
            )}

            <div>
              <div className="flex">
                <textarea
                  type="text"
                  placeholder="Enter your comment here..."
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className="w-[20rem] md:w-[30rem] px-2 py-3 grow outline-none border-gray-200 bg-transparent"
                />
              </div>
              <button
                className="bg-primary w-full h-10 text-white rounded-2xl primary mt-2"
                type="submit">
                Add comment
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2>
              Login to Comment!!{" "}
              <Link className="text-gray-300 underline" to={"/login"}>
                Login Here!
              </Link>
            </h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default CommentForm;
