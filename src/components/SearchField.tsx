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

export default function SearchField() {
  const [selectedKey, setSelectedKey] = useState("user");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function getLink(): string {
    if (selectedKey === "user") return `/account/${input}`;
    if (selectedKey === "transaction") return `/transaction/${input}`;
    if (selectedKey === "token-address") return `/token/${input}`;
    return "";
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 justify-center items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className={`capitalize w-[20rem]`}>
              {selectedKey}
              <FaAngleDown />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([selectedKey])}
            onSelectionChange={(keys) =>
              setSelectedKey(Array.from(keys)[0] as string)
            }
          >
            <DropdownItem key="user">User</DropdownItem>
            <DropdownItem key="token-address">Token Address</DropdownItem>
            <DropdownItem key="transaction">Transaction</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input
          type="input"
          placeholder="Search"
          className="h-full border-0 text-white px-2"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
        <a href={getLink()}>
          <Button onClick={() => setError(true)}>Search</Button>
        </a>
      </div>
      {error && <div>Could not find {selectedKey}</div>}
    </div>
  );
}
