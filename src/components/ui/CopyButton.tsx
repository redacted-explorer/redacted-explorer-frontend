"use client";

import { MdContentCopy } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import AlertCard from "./AlertCard";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }
  return copied ? (
    <AlertCard
      id={1}
      message={"Copied"}
      onRemove={function remove(number: number) {}}
    />
  ) : (
    <Tooltip
      content={<div className="pl-4 pr-4 pt-2 pb-2">Copy</div>}
      shouldCloseOnBlur={false}
      isDismissable={false}
    >
      <div className="hover:cursor-pointer" onClick={handleCopy}>
        <MdContentCopy />
      </div>
    </Tooltip>
  );
}
