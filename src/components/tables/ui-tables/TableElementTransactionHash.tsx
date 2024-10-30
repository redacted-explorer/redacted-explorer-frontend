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
      <div className="min-w-[9rem] relative flex">
        <Link href={`https://nearvalidate.org/txns/${transactionHash}`}>
          <span className="mr-1 ">{truncateString(transactionHash, 12)}</span>
        </Link>
        {hover && <CopyButton text={transactionHash} />}
      </div>
    </div>
  );
}
