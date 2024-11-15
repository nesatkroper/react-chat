import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="flex justify-center items-center p-4 bg-white border-t text-sm text-gray-600 fixed bottom-0 w-full mt-12 shadow-xl">
        <span>Copyright 1999-2024 by</span>
        <a
          href="https://t.me/megalobob"
          className="mx-1 font-semibold text-gray-800 hover:underline"
        >
          Suon Phanun
        </a>
        <span>.</span>
        <span className="mx-1">All Rights Reserved</span>
        <a
          href="https://t.me/megalobob"
          className="font-semibold text-gray-800 hover:underline"
        >
          Suon Phanun
        </a>
        <span>.</span>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
