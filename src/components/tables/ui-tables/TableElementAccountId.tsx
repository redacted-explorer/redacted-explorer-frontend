import Link from "next/link";
import { truncateString } from "../../../utils";
import { useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function TableElementAccountId({
  accountId,
}: {
  accountId: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex gap-1 min-w-[10rem]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/account/${accountId}`} className="hover:text-orange-500">
        {truncateString(accountId, 24)}
      </Link>
      {hover && <CopyButton text={accountId} />}
    </div>
  );
}
