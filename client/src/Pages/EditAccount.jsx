import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function EditAccount() {
  const { user, setUser } = useContext(UserContext);
  const id = user?._id;
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [name, setName] = useState(user?.name || "");
  const [redirect, setRedirect] = useState(false);

  if (user === null) {
    return <Navigate to={"/login"} />;
  }
  const updateUser = async () => {
    try {
      const res = await axios.put(`/account/edit/${id}`, {
        email,
        bio,
        name,
      });
      setUser(res.data);
      setRedirect(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <div className="h-[50vh] flex flex-row border shadow-gray-200 max-w-5xl m-auto mt-9">
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
          <div className="flex flex-col gap-4 items-center">
            <img
              className="h-11 rounded-full"
              src={"http://localhost:4000/userphotos/" + user?.photos[0]}
              alt={user?.name}
            />
            <h4 className="font-Poppins text-white mt-7 font-normal text-sm">
              Email
            </h4>
            <label className="font-Poppins text-white mt-7 font-normal text-sm">
              Bio
            </label>
          </div>

          <div className="flex flex-col gap-5 w-72">
            <input
              type="text"
              className="text-smfont-Poppins font-light text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="text-smfont-Poppins font-light text-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              type="text"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              placeholder="Bio"
              className="text-white"
            />
            {!email && !bio ? (
              <button
                onClick={updateUser}
                disabled
                className="bg-primary mt-5 p-2 w-full text-white rounded-2xl primary">
                Save
              </button>
            ) : (
              <button
                onClick={updateUser}
                className="bg-primary mt-5 p-2 w-full text-white rounded-2xl primary">
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
