import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export default function TableElementTransferAmount({
  amount,
  tokenId: tokenId,
}: {
  amount: BigInt;
  tokenId: string;
}) {
  // TODO get metadata with global cache, and format the amount
  const [hover, setHover] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(tokenId);
  }
  return (
    <div
      className="flex gap-1 min-w-[12rem]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {amount.toString()}{" "}
      <span className="hover:cursor-pointer hover:text-orange-500">
        <a href={`/token/${tokenId}`}>{tokenId}</a>
      </span>
      {hover && (
        <MdContentCopy className="hover:cursor-pointer" onClick={handleCopy} />
      )}
    </div>
  );
}
