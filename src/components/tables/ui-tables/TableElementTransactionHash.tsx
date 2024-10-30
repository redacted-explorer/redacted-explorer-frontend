"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { truncateString } from "../../../utils";
import { useState } from "react";
import CopyButton from "../../ui/CopyButton";

export default function TableElementTransactionHash({
  transactionHash,
}: {
  transactionHash: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex relative">
        <div className="min-w-[10rem] relative flex">
          <span className="mr-1">{truncateString(transactionHash, 12)}</span>
          {hover && <CopyButton text={transactionHash} />}
        </div>

        <Link
          href={`https://nearvalidate.org/txns/${transactionHash}`}
          className="inline-flex"
        >
          <FaExternalLinkAlt />
        </Link>
      </div>
    </div>
  );
}
