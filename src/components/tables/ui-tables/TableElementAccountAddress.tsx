import Link from "next/link";

export default function TableElementAccountAddress({
  accountId,
}: {
  accountId: string;
}) {
  return <Link href={`/account/${accountId}`}>{accountId}</Link>;
}
