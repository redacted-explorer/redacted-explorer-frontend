import CopyButton from "@/components/ui/CopyButton";
import { getTokenMetadata, TokenMetadata } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TableElementTransferAmount({
  amount,
  tokenId: tokenId,
  copyable = true,
}: {
  amount: bigint;
  tokenId: string;
  copyable?: boolean;
}) {
  const [metadata, setMetadata] = useState<TokenMetadata | undefined>();
  useEffect(() => {
    getTokenMetadata(tokenId).then((metadata) => {
      setMetadata(metadata);
    });
  }, [tokenId]);
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex gap-1 min-w-[12rem]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        metadata === undefined
          ? "Loading..."
          : <>
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 3,
            }).format(Number(amount) / (10 ** (metadata.decimals)))}{" "}
            <span className="hover:cursor-pointer hover:text-orange-500">
              <Link href={`/token/${tokenId}`}>{metadata.symbol}</Link>
            </span>
            {hover && copyable && <CopyButton text={tokenId} />}
          </>
      }
    </div>
  );
}
