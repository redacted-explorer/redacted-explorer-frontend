import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function SearchField() {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasResults, setHasResults] = useState({
    account: false,
    tokenContract: false,
    transaction: false,
  });

  async function checkForAccountName(account: string): Promise<boolean> {
    try {
      return await fetch(`https://api.fastnear.com/v1/account/${account}/full`)
        .then((res) => res.json())
        .then((data) => {
          return typeof data !== "string" && data.state !== null;
        });
    } catch (e) {
      console.log("Account Name Error\n", e);
      return false;
    }
  }

  async function checkForContract(contractAddress: string): Promise<boolean> {
    try {
      return await fetch(
        `https://prices.intear.tech/token?token_id=${contractAddress}`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          return data !== null;
        });
    } catch (e) {
      console.log("Contract Address Error\n", e);
      return false;
    }
  }

  async function checkForTransaction(transaction: string): Promise<boolean> {
    try {
      return await fetch(
        `https://events.intear.tech/query/tx_transaction?transaction_id=${transaction}&pagination_by=Newest&limit=1`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data !== null) return true;
          return false;
        });
    } catch (e) {
      console.log("Transaction Error\n", e);
      return false;
    }
  }

  async function handleInput(i: string) {
    setLoading(true);
    setInput(i);
    setHasResults({ account: false, tokenContract: false, transaction: false });
    const accountExists = await checkForAccountName(i);
    if (accountExists) {
      const isContract = await checkForContract(i);
      console.log("is contract:", isContract);
      setHasResults((prev) => ({
        ...prev,
        account: true,
        tokenContract: isContract,
      }));
    } else if (i.length === 44) {
      const isTransaction = await checkForTransaction(i);
      setHasResults((prev) => ({
        ...prev,
        transaction: isTransaction,
      }));
    }
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
              handleInput(e.currentTarget.value);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(true)}
          />

          {focus && (hasResults.account || hasResults.transaction) && (
            <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-slate-700 z-50">
              {hasResults.account && (
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">Account</div>
                  <div className="px-3 py-2 rounded hover:bg-slate-500">
                    <a href={`/account/${input}`}>{input}</a>
                  </div>
                </div>
              )}
              {hasResults.tokenContract && (
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">
                    FT Contract
                  </div>
                  <div className="px-3 py-2 rounded hover:bg-slate-500">
                    <a href={`/token/${input}`}>{input}</a>
                  </div>
                </div>
              )}
              {hasResults.transaction && (
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">
                    Transaction
                  </div>
                  <div className="px-3 py-2 rounded hover:bg-slate-500">
                    <a href={`/transaction/${input}`}>{input}</a>
                  </div>
                </div>
              )}
            </div>
          )}
          {focus &&
            !loading &&
            input !== "" &&
            !(hasResults.account || hasResults.transaction) && (
              <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-slate-700 z-50">
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-500 rounded px-3 py-2">
                    No Result
                  </div>
                </div>
              </div>
            )}
          {loading && (
            <div className="flex gap-2 flex-col absolute py-3 left-0 mt-1 w-full text-white rounded-md shadow-lg bg-slate-700 z-50">
              <div className="bg-slate-500 rounded px-3 py-2">Fetching...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
