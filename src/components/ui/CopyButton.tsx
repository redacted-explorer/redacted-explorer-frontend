"use client";

import { MdContentCopy } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  }
  return copied
    ? (<div className="pl-2">Copied</div>)
    : (
      <Tooltip content={<div className="pl-4 pr-4 pt-2 pb-2">Copy</div>} shouldCloseOnBlur={false} isDismissable={false}>
        <div
          className="hover:cursor-pointer"
          onClick={handleCopy}
        >
          <MdContentCopy />
        </div>
      </Tooltip>
    );
}