import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function ChangePassword() {
  const { user } = useContext(UserContext);
  const id = user?._id;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (user === null) {
    return <Navigate to={"/login"} />;
  }

  const updatePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        return setErrorMessage("New Password & Confirm Password doesn't match");
      } else {
        const response = await axios.put(`/password/change/${id}`, {
          oldPassword,
          newPassword,
        });
        console.log(response);
        if (response.data === "OK") {
          setRedirect(true);
        } else {
          setNewPassword("Old password doesn't match");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <div className="h-[50vh] border flex flex-row shadow-gray-200 max-w-5xl m-auto mt-9">
      <div className="w-[30%] border-r">
        {/* <h1>This is left div</h1> */}
        <div className="text-white px-5 py-5">
          <div className="h-10 border-b">
            <Link
              className="text-xl font-Poppins  font-light"
              to={`/account/edit`}>
              Edit Profile
            </Link>
          </div>

          <div className="h-10 mt-2 border-b">
            <Link
              to={`/password/change`}
              className="text-xl font-Poppins font-light">
              Change Password
            </Link>
          </div>
        </div>
      </div>

      <div className=" flex justify-center w-[70%]">
        <div className="mt-9 gap-4 flex">
          <div className="flex flex-col gap-4 ">
            <div className="ml-32">
              <img
                className="h-11 rounded-full object-contain"
                src={"http://localhost:4000/userphotos/" + user?.photos[0]}
                alt={user?.name}
              />
            </div>
            <div className="mt-3  items-center text-right">
              <h4 className="font-Poppins mb-12 text-white font-normal text-sm">
                Old Password
              </h4>
              <h4 className="font-Poppins mb-12 text-white font-normal text-sm">
                New Password
              </h4>
              <h4 className="font-Poppins  text-white font-normal text-sm">
                Confirm New Password
              </h4>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-72">
            <h4 className="text-xl mt-2 font-Poppins font-light text-white">
              {user?.name}
            </h4>
            <input
              className="text-smfont-Poppins font-light text-white"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              className="text-smfont-Poppins font-light text-white"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="text-smfont-Poppins font-light text-white"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {errorMessage ? (
              <div className="flex">
                <h1 className="text-red-600 text-center font-Poppins font-normal">
                  {errorMessage}
                </h1>
              </div>
            ) : (
              ""
            )}
            <button
              onClick={updatePassword}
              className="bg-primary mt-1 p-2 w-full text-white rounded-2xl primary">
              Save
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
