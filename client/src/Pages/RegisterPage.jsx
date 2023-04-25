import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    try {
      if (name !== "") {
        axios.post("/register", {
          name,
          email,
          password,
        });
      }
      setRedirect(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      return err;
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <NavBar />
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
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
            <button class="primary bg-primary p-2 w-full text-white rounded-2xl">
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
