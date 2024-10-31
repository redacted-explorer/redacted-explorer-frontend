"use client";

import Link from "next/link";
import ExplorerLogo from "@/ui/explorer-logo";
import { usePathname } from "next/navigation";
import SearchBar from "../ui/SearchBar";
import { useMemo, useState } from "react";
import ConnectedAccount from "./ConnectedAccount";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export default function Header() {
  const currentPath = usePathname();
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <div className="pt-8 pb-16">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <ExplorerLogo size={"35px"} />
          </Link>
        </div>
        {currentPath !== "/" && (
          <div className="min-w-96">
            <SearchBar className="w-full rounded-lg border-0 bg-zinc-800 py-2 pl-3 pr-6 text-zinc-200 shadow-sm ring-1 ring-inset ring-zinc-600 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm" />
          </div>
        )}
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <ConnectedAccount />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  );
}
