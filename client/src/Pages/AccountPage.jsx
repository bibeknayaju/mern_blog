import React from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function AccountPage() {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  function logout(e) {
    e.preventDefault();
    axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <nav className="flex flex-col w-full justify-center mt-8 gap-2 mb-8">
      <div className=" gap-1 py-2 px-6 rounded-full">
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
        My Account
      </div>

      <div className="max-w-lg m-auto text-center">
        <div>
          Logged in as {user?.name} ({user?.email})
        </div>

        <br />
        <button
          onClick={logout}
          className="bg-primary p-2 w-full text-white rounded-2xl primary">
          Log out
        </button>
      </div>
    </nav>
  );
}

export default AccountPage;
