import React from "react";
import { Navbar } from "flowbite-react";

function Header() {
  return (
    <Navbar fluid className="bg-mainBg shadow-headerBgShadow">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Kanban
        </span>
      </Navbar.Brand>
      <a href="#">
        <img src="./public/logo.svg" alt="logo" width={140} />
      </a>
      <div className="flex md:order-2">
        <button className="text-white bg-inherit border border-mainBg hover:bg-mainBg focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
          Show menu
        </button>
      </div>
    </Navbar>
  );
}

export default Header;
