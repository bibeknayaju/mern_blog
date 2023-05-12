import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // <div className="text-white h-40 py-4 bottom-0 w-full bg-black text-center">
    //   <div className="bg-transparent">
    //     <h4 className="bg-transparent text-white">©2023 Bibek Nayaju</h4>
    //   </div>
    //   <div className="bg-transparent">
    //     <h2 className="bg-transparent">
    //       Powered by Bibek Nayaju - Work Hard Stay Humble 🚀
    //     </h2>
    //   </div>
    // </div>
    <footer className="bg-white rounded-lg shadow m-4 ">
      <div className="w-full max-w-none mx-auto p-4 md:py-8 ">
        <div className="max-w-7xl m-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to={"/"} className="flex gap-2 items-center mb-4 sm:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                My Blog
              </span>
            </Link>
            <ul className="flex flex-wrap items-center gap-6 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link
                  target="_blank"
                  to={"https://www.facebook.com/bibeknayajushrestha"}>
                  Facebook
                </Link>
              </li>
              <li>
                <Link target="_blank" to={"https://github.com/bibeknayaju"}>
                  Github
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  to={"https://www.linkedin.com/in/bibeknayaju/"}>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  to={"https://www.pinterest.com/bibeknayaju/"}>
                  Pinterest
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        </div>

        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a
            href="https://bibeknayaju.com.np/"
            target="_blank"
            className="hover:underline"
            rel="noreferrer">
            Bibek Nayaju™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
