"use client";

import Link from "next/link";
import ExplorerLogo from "@/ui/explorer-logo";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";
import HeaderMenuItem from "./HeaderMenuItem";
import HeaderMenuDropdown from "./HeaderMenuDropdown";
import SearchField from "../SearchField";
import { usePathname } from "next/navigation";

export default function Header() {
  const [hidden, setHidden] = useState(true);
  const currentPath = usePathname();

  function toggleHidden() {
    setHidden((prev) => !prev);
  }

  return (
    <div className="py-4 pt-8">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <ExplorerLogo size={"35px"} />
          </Link>
        </div>
        {currentPath !== "/landing-page" && (
          <div>
            <SearchField />
          </div>
        )}
      </div>
    </div>
  );
}
