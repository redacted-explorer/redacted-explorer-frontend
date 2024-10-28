import React, { useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";

import { FaAngleDown } from "react-icons/fa";

/*
ToDo
- check if entry exists 
*/
export default function SearchField() {
  const [selectedKey, setSelectedKey] = useState("user");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [hasResults, setHasResults] = useState({
    account: false,
    tokenContract: false,
    transaction: false,
  });

  function getLink(): string {
    if (selectedKey === "user") return `/account/${input}`;
    if (selectedKey === "transaction") return `/transaction/${input}`;
    if (selectedKey === "token-address") return `/token/${input}`;
    return "";
  }

  async function checkForAccountName(account: string): Promise<boolean> {
    try {
      return await fetch(`https://api.fastnear.com/v1/account/${account}/full`)
        .then((res) => res.json())
        .then((data) => {
          if (typeof data !== "string" && data.state !== null) return true;
          return false;
        });
    } catch (e) {
      console.log(e);
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
          if (data !== null) {
            return true;
          }
          return false;
        });
    } catch (e) {
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
      console.log(e);
      return false;
    }
  }

  async function handleInput(input: string) {
    setInput(input);
    setHasResults({ account: false, tokenContract: false, transaction: false });

    const accountExists = await checkForAccountName(input);
    if (accountExists) {
      const isContract = await checkForContract(input);
      console.log("is contract:", isContract);
      setHasResults((prev) => ({
        ...prev,
        account: true,
        tokenContract: isContract,
      }));
    } else {
      const isTransaction = await checkForTransaction(input);
      setHasResults((prev) => ({
        ...prev,
        transaction: isTransaction,
      }));
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 justify-center items-center">
        <div className="relative">
          <Input
            type="input"
            placeholder="Search"
            className="h-full border-0 text-white px-2 w-[30rem]"
            value={input}
            onInput={(e) => {
              handleInput(e.currentTarget.value);
            }}
          />
          {(hasResults.account || hasResults.transaction) && (
            <div className="flex gap-2 flex-col absolute ml-2 p-2 left-0 mt-1 bg-gray-800 text-white rounded-md shadow-lg">
              {hasResults.account && (
                <div>
                  <a href={`/account/${input}`}>Account: {input}</a>
                </div>
              )}
              {hasResults.tokenContract && (
                <div>
                  <a href={`/token/${input}`}>FT Contract: {input}</a>
                </div>
              )}
              {hasResults.transaction && (
                <div>
                  <a href={`/transaction/${input}`}>Transaction {input}</a>
                </div>
              )}
            </div>
          )}
        </div>

        <a href={getLink()}>
          <Button onClick={() => setError(true)}>Search</Button>
        </a>
      </div>
      {error && <div>Could not find {selectedKey}</div>}
    </div>
  );
}
