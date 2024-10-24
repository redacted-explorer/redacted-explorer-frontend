import { TimeAgo } from "@/components/ui/TimeAgo";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  TokenData,
  TokenMetadata,
  TokenTransferData,
  TokenTransferTableRow,
  TradeTableRow,
  TransactionData,
  TransactionTableRow,
} from "./types";
import Link from "next/link";
import TableElementAccountAddress from "@/components/tables/ui-tables/TableElementAccountAddress";
import TableElementTransactionHash from "@/components/tables/ui-tables/TableElementTransactionHash";

export function timestampToTimeDifference(
  timestampNanosec: string | number,
  currentTime?: Date
): string {
  /* timestamp is in nanoseconds, Date().getTime() in milliseconds */
  timestampNanosec = Number(timestampNanosec) / 1000000;
  const now = currentTime ? currentTime.getTime() : new Date().getTime();
  let difference = Math.abs(now - timestampNanosec);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  difference -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  difference -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(difference / (1000 * 60));
  difference -= minutes * (1000 * 60);

  const seconds = Math.floor(difference / 1000);

  if (days > 0) {
    return `${days}d ${hours}h ago`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ago`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s ago`;
  }
  return `${seconds}s ago`;
}

export function convertIntToFloat(amount: string, decimals: number): string {
  const digitsAmount = amount.length;
  let result: string;
  if (digitsAmount <= decimals) {
    const additionalZeros = "0".repeat(decimals - digitsAmount);
    result = `0.${additionalZeros}${amount}`;
  } else {
    const index = digitsAmount - decimals;
    result = `${amount.slice(0, index)}.${amount.slice(index)}`;
  }
  // Remove trailing zeros after comma and remove the comma if it's the last character
  if (result.includes(".")) {
    result = result.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  return result;
}

export function convertFloatToInt(input: string, decimals: number): string {
  // Replace a comma with a dot to standardize the separator
  input = input.replace(",", ".");

  if (input.includes(".")) {
    // Split the number into integer and fractional parts
    let [integerPart, fractionalPart] = input.split(".");

    // Calculate the number of zeros to add
    let zerosToAdd = decimals - fractionalPart.length;

    // If there are more digits than decimals, truncate the fractional part
    if (zerosToAdd < 0) {
      fractionalPart = fractionalPart.slice(0, decimals);
      zerosToAdd = 0;
    }

    // Remove the dot and add the zeros
    return integerPart + fractionalPart + "0".repeat(zerosToAdd);
  } else {
    // No separator present, just add `decimals` number of zeros
    return input + "0".repeat(decimals);
  }
}

export function truncateString(str: string, length: number) {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
}

export function formatNumber(number: number) {
  let outputNumber = 0;
  if (number > -1 && number < 1) {
    outputNumber = Number(number.toFixed(3));
  } else if (number > -10 && number < 10) {
    outputNumber = Number(number.toFixed(2));
  } else if (number > -100 && number < 100) {
    outputNumber = Number(number.toFixed(1));
  } else {
    outputNumber = Number(number.toFixed(0));
  }
  return outputNumber.toLocaleString("en-US");
}

export function transactionDataToRow(
  date: TransactionData
): TransactionTableRow {
  const id = date.id;
  const transactionId = (
    <TableElementTransactionHash transactionHash={date.event.transaction_id} />
  );
  const blockHeight = date.event.block_height;
  const time = timestampToTimeDifference(date.event.block_timestamp_nanosec);
  const receiver = (
    <TableElementAccountAddress accountId={date.event.new_owner_id} />
  );
  console.log(date);
  const row: TransactionTableRow = {
    id,
    transactionId,
    blockHeight,
    time,
    receiver,
  };
  return row;
}

export function ftTransferEventToRow(
  date: TokenTransferData,
  tokenData?: TokenData
) {
  const { id } = date;
  const sender = (
    <TableElementAccountAddress accountId={date.event.old_owner_id} />
  );
  const receiver = (
    <TableElementAccountAddress accountId={date.event.new_owner_id} />
  );
  const time = timestampToTimeDifference(date.event.block_timestamp_nanosec);
  let amount = date.event.amount.toString();
  let tokenId = date.event.token_id;
  let price = "unknown";
  if (tokenData) {
    const currentPrice = tokenData.price_usd;
    amount = convertIntToFloat(amount, tokenData.metadata.decimals);
    tokenId = tokenData.metadata.symbol;
    price = formatNumber(Number(amount) * Number(currentPrice));
  }
  const txn = (
    <div>
      <Link
        href={`https://nearblocks.io/txns/${date.event.transaction_id}`}
        target="_blank"
      >
        <FaExternalLinkAlt />
      </Link>
    </div>
  );
  const row: TokenTransferTableRow = {
    id,
    time,
    transfer: `${amount} ${tokenId}`,
    sender,
    receiver,
    amount,
    price,
    txn,
  };
  return row;
}

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
    maker: <TableElementAccountAddress accountId={trader} />,
    txn: txnLink,
  };
  console.log("Returning the following row", row);
  return row;
}
