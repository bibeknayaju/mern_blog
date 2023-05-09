import React from "react";

function About() {
  return (
    <div className="mb-10 border-b bg-black py-8 border-gray-500 h-fit">
      <img
        className="h-32 rounded-full max-w-5xl m-auto mb-3"
        src="http://localhost:4000/userphotos/3a4cc344e30c9707f166e042bb0aa6b2.jpeg"
        alt="bibek"
      />

      <h2 className="sm:w-[50%] md:w-[40%] text-center m-auto text-white font-Montserrat mb-6 bg-transparent font-normal">
        A fervent Software Engineer with a penchant for Software Architecture
        and Content Creation, adept at communicating and advocating the latest
        technologies and motivating others.✨🚀
      </h2>
    </div>
  );
}

export default About;
