import Link from "next/link";

export default function TableElementTransactionHash({
  transactionHash,
}: {
  transactionHash: string;
}) {
  return (
    <Link href={`/transaction/${transactionHash}`}>{transactionHash}</Link>
  );
}
