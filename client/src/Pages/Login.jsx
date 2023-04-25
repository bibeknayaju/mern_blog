import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { UserContext } from "../UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);

  const { setUser } = useContext(UserContext);

  function handleSubmitLogin(e) {
    e.preventDefault();
    try {
      const response = axios.post("/login", { email, password });
      setUser(response.data);
      setRedirect(true);
    } catch (e) {
      return alert(e, "error");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <NavBar />
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1>Login Page</h1>

          <form className="max-w-md mx-auto" onSubmit={handleSubmitLogin}>
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
            <button className="bg-primary p-2 w-full text-white rounded-2xl primary">
              Login
            </button>

            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?{" "}
              <Link to="/register" className="underline text-black">
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
