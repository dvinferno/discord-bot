import React from "react";

import LinkButton from "./LinkButton";
import { DocIcon } from "../Icons/DocIcon";
import { DashIcon } from "../Icons/DashIcon";
import { AddIcon } from "../Icons/AddIcon";

export default function Nav() {
  return (
    <nav>
      <div className="w-full flex flex-wrap items-center justify-between mx-auto pt-4 pr-4 pl-4">
        <div className="flex items-center justify-between space-x-5">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../../src/assets/icon.png"
              className="h-12"
              alt="Bot Logo"
            />
          </a>
          <DashIcon />
          <DocIcon />
          <button
            onClick={() => {
              window.location.href =
                "https://discord.com/oauth2/authorize?client_id=1337861308166438932";
            }}
            className="cursor-pointer"
          >
            <AddIcon filled={true} fill="#9a96ff" />
          </button>
        </div>
        <div
          className="w-full items-center justify-between hidden md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <LinkButton
            text="Login"
            redirectUri="http://localhost:3002/auth/discord"
          />
        </div>
      </div>
    </nav>
  );
}
