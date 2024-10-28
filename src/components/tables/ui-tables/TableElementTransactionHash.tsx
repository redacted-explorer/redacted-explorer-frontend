"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { truncateString } from "../../../../utils";
import { Tooltip, Button } from "@nextui-org/react";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export default function TableElementTransactionHash({
  transactionHash,
}: {
  transactionHash: string;
}) {
  const [hover, setHover] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(transactionHash);
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex relative">
        <div className="min-w-[10rem] relative flex">
          <span className="mr-1">{truncateString(transactionHash, 14)}</span>
          {hover && (
            <MdContentCopy
              className="hover:cursor-pointer"
              onClick={handleCopy}
            />
          )}
        </div>

        <Link
          href={`https://nearvalidate.org/txns/${transactionHash}`}
          className="inline-flex"
        >
          <FaExternalLinkAlt></FaExternalLinkAlt>
        </Link>
      </div>
    </div>
  );
}
