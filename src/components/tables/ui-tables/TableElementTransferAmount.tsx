import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export default function TableElementTransferAmount({
  amount,
  ticker,
  tokenAddress,
}: {
  amount: string;
  ticker: string;
  tokenAddress: string;
}) {
  const [hover, setHover] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(tokenAddress);
  }
  return (
    <div
      className="flex gap-1 min-w-[12rem]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {amount}{" "}
      <span className="hover:cursor-pointer hover:text-orange-500">
        <a href={`/token/${tokenAddress}`}>{ticker}</a>
      </span>
      {hover && (
        <MdContentCopy className="hover:cursor-pointer" onClick={handleCopy} />
      )}
    </div>
  );
}
