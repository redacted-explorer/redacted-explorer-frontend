"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getNear, TokenData } from "@/utils";
import { useRouter } from "next/navigation";

type Entry = {
  id: string;
  kind: "account" | "token" | "transaction";
  display: string;
};

export default function SearchBar({
  className,
  landingPage,
}: {
  className?: string;
  landingPage?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [accounts, setAccounts] = useState<Entry[]>([]);
  const [tokens, setTokens] = useState<Entry[]>([]);
  const [transactions, setTransactions] = useState<Entry[]>([]);

  async function searchAccounts(query: string): Promise<Entry[]> {
    const accounts = ["root.near", "slimedragon.near", "within4d45.near"];
    try {
      const results = accounts.filter((account) =>
        account.startsWith(query.toLowerCase())
      );
      if (results.includes(query)) {
        return [
          {
            id: query,
            display: query,
            kind: "account",
          },
          ...results
            .filter((account) => account !== query)
            .map((account) => ({
              id: account,
              display: account,
              kind: "account" as const,
            })),
        ];
      } else {
        const NEAR = await getNear();
        const account = await NEAR.account(query).catch(() => null);
        const keys =
          (await account
            ?.getAccessKeys()
            .then((data) => [...data.keys()])
            .catch(() => null)) ?? [];
        const accountExists = keys.length > 0;
        if (accountExists) {
          return [
            {
              id: query,
              display: query,
              kind: "account",
            },
            ...results.map((account) => ({
              id: account,
              display: account,
              kind: "account" as const,
            })),
          ];
        } else {
          return results.map((account) => ({
            id: account,
            display: account,
            kind: "account" as const,
          }));
        }
      }
    } catch (e) {
      return [];
    }
  }

  async function searchTokens(query: string): Promise<Entry[]> {
    try {
      return await fetch(`https://prices.intear.tech/token-search?q=${query}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) =>
          data.map((token: TokenData) => ({
            id: token.account_id,
            display: token.metadata.name,
            kind: "token",
          }))
        );
    } catch (e) {
      console.log("Error searching for token\n", e);
      return [];
    }
  }

  async function searchTransactions(query: string): Promise<Entry[]> {
    try {
      return await fetch(
        `https://events.intear.tech/query/tx_transaction?transaction_id=${query}&pagination_by=Newest&limit=1`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data !== null)
            return [{ id: query, display: query, kind: "transaction" }];
          return [];
        });
    } catch (e) {
      console.log("Error checking for transaction\n", e);
      return [];
    }
  }

  useEffect(() => {
    if (query.length > 0) {
      searchTokens(query).then((tokens) => {
        setTokens(tokens);
      });
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 2) {
      searchAccounts(query).then((accounts) => {
        setAccounts(accounts);
      });
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 5) {
      searchTransactions(query).then((transactions) => {
        setTransactions(transactions);
      });
    }
  }, [query]);

  useEffect(() => {
    if (selectedEntry === null) return;
    router.push(`/${selectedEntry.kind}/${selectedEntry.id}`);
  }, [selectedEntry]);

  return (
    <Combobox
      as="div"
      value={selectedEntry}
      onChange={(person) => {
        setQuery("");
        setSelectedEntry(person);
      }}
    >
      <div className="relative mt-2">
        <ComboboxInput
          className={
            className
              ? className
              : "w-full rounded-lg border-0 bg-zinc-800  py-3 pl-4 pr-12 text-zinc-200 shadow-sm ring-1 ring-inset ring-zinc-600 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-xl"
          }
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          displayValue={(person: Entry) => person?.id ?? ""}
          placeholder={
            landingPage ? "Search for accounts, tokens and transactions" : ""
          }
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
        </ComboboxButton>

        {accounts.length > 0 || tokens.length > 0 || transactions.length > 0 ? (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-96 w-full border-2 border-zinc-500 overflow-auto rounded-md bg-zinc-800 text-zinc-200 pb-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div className="bg-zinc-900 py-2 pl-3 text-xs font-medium">
              Accounts
            </div>
            {accounts.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-zinc-200 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                {person.display}
              </ComboboxOption>
            ))}
            {accounts.length === 0 ? (
              <div className="text-zinc-600 py-2 pl-3 text-xs font-medium">
                No results
              </div>
            ) : (
              <></>
            )}
            <div className="bg-zinc-900 py-2 pl-3 text-xs font-medium">
              Tokens
            </div>
            {tokens.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-zinc-200 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                {person.display}
              </ComboboxOption>
            ))}
            {tokens.length === 0 ? (
              <div className="text-zinc-600 py-2 pl-3 text-xs font-medium">
                No results
              </div>
            ) : (
              <></>
            )}
            <div className="bg-zinc-900 py-2 pl-3 text-xs font-medium">
              Transactions
            </div>
            {transactions.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-zinc-200 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                {person.display}
              </ComboboxOption>
            ))}
            {transactions.length === 0 ? (
              <div className="text-zinc-600 py-2 pl-3 text-xs font-medium">
                {query.length > 5 ? "No results" : "Type more characters ..."}
              </div>
            ) : (
              <></>
            )}
          </ComboboxOptions>
        ) : (
          <></>
        )}
      </div>
    </Combobox>
  );
}
