import React, { useEffect } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import AccountBlog from "../Components/AccountBlog";

function AccountPage() {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [blogs, setBlog] = useState([]);
  console.log(blogs);
  const id = user?._id;
  const [loading, setLoading] = useState(true);

  // if (!user) {
  //   return <Navigate to={"/login"} />;
  // } else {
  // }
  function logout(e) {
    e.preventDefault();
    axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios.get(`/account/blog/${user?._id}`).then((response) => {
      setBlog(response.data);
      setLoading(false);
    });
  }, [id, user?._id]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <nav className="text-white max-w-6xl m-auto flex flex-col grow justify-center my-8 gap-2">
      <Helmet>
        <title>{user?.name} | Account Page</title>
        <meta name="description" content="My Page Description" />
      </Helmet>
      <div className=" gap-1 py-2 px-6 items-center flex flex-row mb-10  rounded-3xl m-auto text-center">
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <span className="font-Montserrat text-3xl ">My Account</span>
      </div>

      <div className="flex max-w-6xl m-auto gap-6">
        <div className=" rounded-full ">
          <img
            src={"http://localhost:4000/userphotos/" + user?.photos?.[0]}
            alt={user?.email}
            className="h-24 rounded-full"
          />
        </div>

        <div className="">
          <div className="flex flex-row items-center gap-2 justify-center mb-6 ">
            <div className="mr-7">
              <h4 className="font-Montserrat text-base font-medium">
                {user?.email.split("@gmail.com")}
              </h4>
            </div>
            <button className=" py-2 px-6 border rounded-xl bg-white">
              <Link className="" to={`/account/edit`}>
                <h5 className="text-black bg-white">Edit Profile</h5>
              </Link>
            </button>
          </div>

          <div className="text-left">
            <h3 className="font-Poppins text-lg font-bold">{user?.name}</h3>
          </div>

          <div className="text-left">
            <span className="font-Montserrat text-sm ">{user?.bio}</span>
          </div>
          <div className="mb-5">
            <br />
            <button
              onClick={logout}
              className="bg-primary p-2 w-full text-white rounded-2xl primary">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <hr />

        <div className="text-center my-5">
          <h2 className="font-Montserrat text-xl font-medium ">My Blogs</h2>
        </div>
        {loading ? (
          <div className="text-center">
            <h2 className="font-Montserrat text-2xl font-light">Loading...</h2>
          </div>
        ) : (
          <div className="grid p-4 mg:p-0 lg:p-0 sm:grid-col-1 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-6xl m-auto">
            {blogs.length > 0 &&
              blogs.map((blog) => <AccountBlog blog={blog} />)}
          </div>
        )}
      </div>
    </nav>
  );
}

export default AccountPage;
