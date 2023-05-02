import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";

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
      <div className="mt-4 text-white grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input
              className="w-full border rounded-lg py-3 px-4 mb-2"
              multiple
              onChange={uploadPhoto}
              type="file"
            />
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

            <div className="text-center py-2 text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="underline text-black">
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
