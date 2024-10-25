import { TimeAgo } from "@/components/ui/TimeAgo";
import { TradeTableRow } from "./types";
import { convertIntToFloat, formatNumber, truncateString } from "./utils";
import { FaExternalLinkAlt } from "react-icons/fa";

export function tradeEventToRow(
  event: any,
  tokenAddress: string,
  allTokensMetadata: any,
  id?: number
): TradeTableRow {
  console.log("in trade event to row");
  console.log(event);

  const { block_timestamp_nanosec, balance_changes, trader, transaction_id } =
    event;
  const otherTokenAddress =
    Object.keys(balance_changes)[0] === tokenAddress
      ? Object.keys(balance_changes)[1]
      : Object.keys(balance_changes)[0];
  const tokenMetadata = allTokensMetadata[tokenAddress];
  const otherTokenMetadata = allTokensMetadata[otherTokenAddress];

  const time = <TimeAgo timestampNanosec={block_timestamp_nanosec} />;
  const timestamp = block_timestamp_nanosec;
  const type = balance_changes[tokenAddress]
    ? balance_changes[tokenAddress] < 0
      ? "sell"
      : "buy"
    : "Arbitrage";

  /* get rid of the '-' in front of the swapped token */
  let fromAmount = balance_changes[tokenAddress]
    ? balance_changes[tokenAddress].replace(/^-/, "")
    : "🤡";

  if (tokenMetadata) {
    fromAmount = formatNumber(
      Number(convertIntToFloat(fromAmount, tokenMetadata.metadata.decimals))
    );
  }
  /* get other token information */
  let swappedFor = "Nothing";
  if (balance_changes[otherTokenAddress]) {
    const qtyOtherToken = balance_changes[otherTokenAddress].replace(/^-/, "");
    if (otherTokenMetadata) {
      let ticker = otherTokenMetadata.metadata.symbol;
      let swapQty = convertIntToFloat(
        qtyOtherToken.toString(),
        otherTokenMetadata.metadata.decimals
      );
      swappedFor = `${formatNumber(Number(swapQty))} ${ticker}`;
    } else {
      swappedFor = `${qtyOtherToken} ${otherTokenAddress}`;
    }
  }

  const txnLink = (
    <div>
      <a href={`https://nearblocks.io/txns/${transaction_id}`} target="_blank">
        <FaExternalLinkAlt />
      </a>
    </div>
  );
  const row: TradeTableRow = {
    id,
    key: event.transaction_id,
    time,
    timestamp,
    type,
    fromAmount,
    swappedFor,
    price: "coming soon",
    maker: truncateString(trader, 20),
    txn: txnLink,
  };
  console.log("Returning the following row", row);
  return row;
}
