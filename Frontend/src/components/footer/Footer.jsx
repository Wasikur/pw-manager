import React from "react";

const Footer = () => {
  return (
    <div className="flex bg-slate-800 text-white text-center flex flex-col justify-center items-center w-full min-h-[10vh]">
      <div className="logo font-bold text-2xl text-white">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP / &gt;</span>
      </div>
      <div className="flex">Created with 🧡 by Wasikur</div>
    </div>
  );
};

export default Footer;
