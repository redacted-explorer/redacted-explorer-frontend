import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function TableElementTransactionHash({
  transactionHash,
}: {
  transactionHash: string;
}) {
  return (
    <Link href={`https://nearvalidate.org/txns/${transactionHash}`} className="inline-flex">
      <span className="pr-2">
        {transactionHash}
      </span>
      <FaExternalLinkAlt></FaExternalLinkAlt>
    </Link>
  );
}
