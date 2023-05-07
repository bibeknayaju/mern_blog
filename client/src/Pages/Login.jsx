import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Helmet } from "react-helmet";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleSubmitLogin(e) {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then((response) => {
        setUser(response.data);

        if (response.data === null) {
          setRedirect(false);
          setErrorMessage("Incorrect email or password.");
        } else {
          setRedirect(true);

          alert("login successful!");
        }
      })
      .catch((error) => {
        alert("login failed. please try again.");
      });
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="text-white mt-4 grow flex items-center justify-around">
        <Helmet>
          <title>{"Login Page"}</title>
          <meta name="description" content="My Page Description" />
        </Helmet>
        <div className="mb-64">
          <h1 className="text-center font-Montserrat mb-5 text-3xl">Login</h1>

          <form className="max-w-md mx-auto" onSubmit={handleSubmitLogin}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />

            <div className="relative mt-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-0 top-0 mt-3 mr-2 text-gray-400">
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                      clipRule="evenodd"
                    />
                    <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                      fillRule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button className="bg-primary mt-5 p-2 w-full text-white rounded-2xl primary">
              Login
            </button>

            {errorMessage && (
              <div className="mt-3">
                <h3 className="text-red-500 font-Montserrat text-center">
                  {errorMessage}
                </h3>
              </div>
            )}

            <div className="text-center py-2 text-white">
              Don't have an account yet?{" "}
              <Link to="/register" className="underline text-gray-300">
                Register Now!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
