import React from "react";

const Navbar = () => {
   const openExternalLink = (url) => {
    console.log("Opening external link:", url);
    window.open(url);
  };
  return (
    <nav className="bg-slate-800 text-white">
      <div className="flex justify-between items-center px-6 py-5 h-14 mycontainer">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP / &gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About Us
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
       <button
          className="flex justify-between items-center text-white bg-green-700 my-5 rounded-full ring-white ring-1"
          onClick={() =>
            openExternalLink("https://github.com/Wasikur/pw-manager.git")
          }
        >
          <img className="p-2 w-10 " src="icons/github.svg" alt="github-logo" />
          <span className="font-bold px-2 ">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
