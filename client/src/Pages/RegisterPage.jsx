import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/account/photos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data: fileNames } = response;
        console.log(response);
        setUserPhoto((prev) => {
          return [...prev, ...fileNames];
        });
      });
  }

  function registerUser(e) {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        if (name !== "") {
          axios.post("/register", {
            name,
            email,
            password,
            userPhoto,
          });
        }
        setRedirect(true);
        setName("");
        setEmail("");
        setPassword("");
        setUserPhoto([]);
      } else {
        return alert("Password does not match");
      }
    } catch (err) {
      return err;
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="mt-4 text-white grow flex max-w-7xl m-auto items-center justify-around">
        <Helmet>
          <title>{"Register Page"}</title>
          <meta name="description" content="My Page Description" />
        </Helmet>
        <div className="mb-36">
          <h1 className=" text-center font-Montserrat mb-5 text-3xl">
            Register
          </h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <label class="relative cursor-pointer mb-2 rounded-md font-medium text-gray-100 hover:text-indigo-500 flex items-center gap-1 justify-center border bg-transparent p-2 text-">
              <span>Select a file</span>
              <input
                className="w-full hidden border rounded-lg py-3 px-4 mb-2"
                multiple
                onChange={uploadPhoto}
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

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />

            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            <button className="primary bg-primary p-2 w-full text-white rounded-2xl">
              Register
            </button>

            <div className="text-center py-2 text-gray-100">
              Already have an account?{" "}
              <Link to="/login" className="underline text-gray-300">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
