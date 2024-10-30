import React, { useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { TokenData } from "@/utils";
import Link from "next/link";

type SearchResult = {
  id: string;
  display: React.ReactNode;
}

export default function SearchField() {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [results, setResults] = useState<{
    accounts: SearchResult[];
    tokens: SearchResult[];
    transactions: SearchResult[];
  }>({
    accounts: [],
    tokens: [],
    transactions: [],
  });

  async function searchAccounts(query: string): Promise<SearchResult[]> {
    const accounts = [
      "root.near",
      "slimedragon.near",
      "within4d45.near",
    ];
    try {
      const results = accounts.filter((account) => account.startsWith(query.toLowerCase()));
      console.log(results);
      if (results.includes(query)) {
        return [
          {
            id: query,
            display: query,
          },
          ...results.filter((account) => account !== query).map((account) => ({ id: account, display: account })),
        ]
      } else {
        const accountExists = await fetch(`https://api.fastnear.com/v1/account/${query}/full`)
          .then((res) => res.json())
          .then((data) => {
            return typeof data !== "string" && data.state !== null;
          });
        if (accountExists) {
          return [
            {
              id: query,
              display: query,
            },
            ...results.map((account) => ({ id: account, display: account })),
          ];
        } else {
          return results.map((account) => ({ id: account, display: account }));
        }
      }
    } catch (e) {
      console.log("Error searching for account\n", e);
      return [];
    }
  }

  async function searchTokens(query: string): Promise<SearchResult[]> {
    try {
      return await fetch(
        `https://prices.intear.tech/token-search?q=${query}`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => data.map((token: TokenData) => ({ id: token.account_id, display: token.metadata.name })));
    } catch (e) {
      console.log("Error searching for token\n", e);
      return [];
    }
  }

  async function searchTransactions(query: string): Promise<SearchResult[]> {
    try {
      return await fetch(
        `https://events.intear.tech/query/tx_transaction?transaction_id=${query}&pagination_by=Newest&limit=1`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data !== null) return [{ id: query, display: query }];
          return [];
        });
    } catch (e) {
      console.log("Error checking for transaction\n", e);
      return [];
    }
  }

  async function search(i: string) {
    setLoading(true);
    setInput(i);
    if (i.length === 0) {
      setResults({
        accounts: [],
        tokens: [],
        transactions: [],
      });
      setLoading(false);
      return;
    }
    const accounts = await searchAccounts(i);
    const tokens = await searchTokens(i);
    const transactions = await searchTransactions(i);
    setResults({
      accounts: accounts,
      tokens: tokens,
      transactions: transactions,
    });
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 items-center" ref={ref}>
      <div className="flex gap-2 justify-center items-center">
        <div className="relative">
          <Input
            type="input"
            radius="sm"
            placeholder="Search"
            className="h-full text-white px-2 w-[30rem]"
            value={input}
            onInput={(e) => {
              search(e.currentTarget.value);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(true)}
          />

          {focus && (results.accounts.length !== 0 || results.tokens.length !== 0 || results.transactions.length !== 0) && (
            <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-slate-700 z-50">
              {results.accounts.length !== 0 && (
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">Accounts</div>
                  {
                    results.accounts.map((account) => (
                      <Link href={`/account/${account.id}`}>
                        <div className="px-3 py-2 rounded hover:bg-slate-500" key={account.id}>
                          {account.display}
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )}
              {results.tokens.length !== 0 && (
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">
                    Tokens
                  </div>
                  {
                    results.tokens.map((token) => (
                      <Link href={`/token/${token.id}`}>
                        <div className="px-3 py-2 rounded hover:bg-slate-500" key={token.id}>
                          {token.display}
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )}
              {results.transactions.length !== 0 && (
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">
                    Transactions
                  </div>
                  {
                    results.transactions.map((transaction) => (
                      <Link href={`/transaction/${transaction.id}`}>
                        <div className="px-3 py-2 rounded hover:bg-slate-500" key={transaction.id}>
                          {transaction.display}
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )}
            </div>
          )}
          {focus &&
            input !== "" &&
            !(results.accounts || results.transactions) && (
              <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-slate-700 z-50">
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">
                    {loading ? "Loading..." : "No Results"}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
