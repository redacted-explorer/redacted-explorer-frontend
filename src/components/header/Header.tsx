"use client";

import Link from "next/link";
import ExplorerLogo from "@/ui/explorer-logo";
import { usePathname } from "next/navigation";
import SearchBar from "../ui/SearchBar";

export default function Header() {
  const currentPath = usePathname();

  return (
    <div className="py-4 pt-8">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <ExplorerLogo size={"35px"} />
          </Link>
        </div>
        {currentPath !== "/landing-page" && (
          <div className="min-w-96">
            <SearchBar className="w-full rounded-lg border-0 bg-zinc-800 py-2 pl-3 pr-6 text-zinc-200 shadow-sm ring-1 ring-inset ring-zinc-600 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm" />
          </div>
        )}
      </div>
    </div>
  );
}
