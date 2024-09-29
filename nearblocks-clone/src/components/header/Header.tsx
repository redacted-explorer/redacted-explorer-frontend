"use client";

import Link from "next/link";
import Image from "next/image";
import NearblocksLogo from "@/ui/nearblocks-logo";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";
import HeaderMenuItem from "./HeaderMenuItem";
import HeaderMenuDropdown from "./HeaderMenuDropdown";
import { IoSunnyOutline } from "react-icons/io5";

export default function Header() {
  const [hidden, setHidden] = useState(true);

  function toggleHidden() {
    setHidden((prev) => !prev);
  }

  return (
    <div className="p-4 border-b-gray-200 border-b-2">
      <div className="flex justify-between items-center">
        <div>
          <NearblocksLogo height={"30px"} />
        </div>
        <div className="flex space-x-4">
          <button>
            <IoSunnyOutline />
          </button>
          <button
            className="flex items-center justify-center"
            onClick={toggleHidden}
          >
            <RiMenu3Fill />
          </button>
        </div>
      </div>
      {!hidden && (
        <HeaderMenu>
          <HeaderMenuItem url="">Home</HeaderMenuItem>
          <HeaderMenuDropdown text="Blockchain">
            <HeaderMenuItem url="">View Blocks</HeaderMenuItem>
            <HeaderMenuItem url="">View Txns</HeaderMenuItem>
            <HeaderMenuItem url="">Charts & Stats</HeaderMenuItem>
            <HeaderMenuItem url="">Node Explorer</HeaderMenuItem>
          </HeaderMenuDropdown>
          <HeaderMenuDropdown text="Tokens">
            <HeaderMenuItem url="">Top Tokens</HeaderMenuItem>
            <HeaderMenuItem url="">Token Transfers</HeaderMenuItem>
            <HeaderMenuItem url="">Top NFT Tokens</HeaderMenuItem>
            <HeaderMenuItem url="">NFT Token Transfer</HeaderMenuItem>
          </HeaderMenuDropdown>{" "}
          <HeaderMenuDropdown text="Blockchain">
            <HeaderMenuItem url="">View Blocks</HeaderMenuItem>
            <HeaderMenuItem url="">View Txns</HeaderMenuItem>
            <HeaderMenuItem url="">Charts & Stats</HeaderMenuItem>
            <HeaderMenuItem url="">Node Explorer</HeaderMenuItem>
          </HeaderMenuDropdown>
        </HeaderMenu>
      )}
    </div>
  );
}
