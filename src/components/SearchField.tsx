import React, { useState } from "react";
import { getNear, TokenData } from "@/utils";
import Link from "next/link";

type SearchResult = {
  id: string;
  display: React.ReactNode;
};

export default function SearchField({ className }: { className?: string }) {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
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
          },
          ...results
            .filter((account) => account !== query)
            .map((account) => ({ id: account, display: account })),
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
            },
            ...results.map((account) => ({ id: account, display: account })),
          ];
        } else {
          return results.map((account) => ({ id: account, display: account }));
        }
      }
    } catch (e) {
      return [];
    }
  }

  async function searchTokens(query: string): Promise<SearchResult[]> {
    try {
      return await fetch(`https://prices.intear.tech/token-search?q=${query}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) =>
          data.map((token: TokenData) => ({
            id: token.account_id,
            display: token.metadata.name,
          }))
        );
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
    let accountsPromise = searchAccounts(i);
    let tokensPromise = searchTokens(i);
    let transactionsPromise = searchTransactions(i);
    let [accounts, tokens, transactions] = await Promise.all([
      accountsPromise,
      tokensPromise,
      transactionsPromise,
    ]);
    setResults({
      accounts: accounts,
      tokens: tokens,
      transactions: transactions,
    });
    setLoading(false);
  }

  return (
    <div className="relative">
      <input
        type="input"
        placeholder="Search"
        className={
          className
            ? className
            : "h-full text-white rounded-lg px-2 py-2 w-[30rem] bg-zinc-800"
        }
        value={input}
        onInput={(e) => {
          search(e.currentTarget.value);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(true)}
      ></input>

      {focus &&
        (results.accounts.length !== 0 ||
          results.tokens.length !== 0 ||
          results.transactions.length !== 0) && (
          <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-zinc-800 z-50">
            {results.accounts.length !== 0 && (
              <div className="flex flex-col gap-1">
                <div className="bg-zinc-600 rounded px-3 py-2 font-semibold">
                  Accounts
                </div>
                {results.accounts.map((account) => (
                  <Link href={`/account/${account.id}`}>
                    <div
                      className="px-3 py-2 rounded hover:bg-zinc-700 text-sm"
                      key={account.id}
                    >
                      {account.display}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {results.tokens.length !== 0 && (
              <div className="flex flex-col gap-1">
                <div className="bg-zinc-600 rounded px-3 py-2 font-semibold">
                  Tokens
                </div>
                {results.tokens.map((token) => (
                  <Link href={`/token/${token.id}`}>
                    <div
                      className="px-3 py-2 rounded hover:bg-zinc-700 text-sm"
                      key={token.id}
                    >
                      {token.display}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {results.transactions.length !== 0 && (
              <div className="flex flex-col gap-1">
                <div className="bg-zinc-600 rounded px-3 py-2 font-semibold">
                  Transactions
                </div>
                {results.transactions.map((transaction) => (
                  <Link href={`/transaction/${transaction.id}`}>
                    <div
                      className="px-3 py-2 rounded hover:bg-zinc-700 text-sm"
                      key={transaction.id}
                    >
                      {transaction.display}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      {focus && input !== "" && !(results.accounts || results.transactions) && (
        <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-slate-700 z-50">
          <div className="flex flex-col gap-1">
            <div className="bg-slate-500 rounded px-3 py-2">
              {loading ? "Loading..." : "No Results"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
