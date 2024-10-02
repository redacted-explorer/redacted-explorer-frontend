import { FaExternalLinkAlt } from "react-icons/fa";

export type TradeRow = {
  id: number;
  time: string;
  timestamp: number;
  swapped: string;
  swappedFor: string;
  price: string;
  maker: string;
  txn: React.ReactNode;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
};

export function timestampToTimeDifference(timestamp: number): string {
  /* timestamp is in nanoseconds, Date().getTime() in milliseconds */
  timestamp = timestamp / 1000000;
  const now = new Date().getTime();
  let difference = Math.abs(now - timestamp);
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

export function intToFloat(amount: string, decimals: number): string {
  let number = parseFloat(amount);
  let result = number * Math.pow(10, -decimals);
  return result.toString();
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

export function formatNumber(number: number | string) {
  number = Number(number);
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

export function tradeEventToRow(event: any, allTokensMetadata: any): TradeRow {
  const { block_timestamp_nanosec, balance_changes, trader, transaction_id } =
    event;
  const [tokenAddress, otherTokenAddress]: string[] =
    Object.keys(balance_changes);
  const tokenMetadata = allTokensMetadata[tokenAddress];
  const otherTokenMetadata = allTokensMetadata[otherTokenAddress];

  const time = timestampToTimeDifference(block_timestamp_nanosec);
  const timestamp = block_timestamp_nanosec;
  const type = balance_changes[tokenAddress] < 0 ? "sell" : "buy";

  /* get rid of the '-' in front of the swapped token */
  let swapped = "unknown";
  const qtyToken = balance_changes[tokenAddress].replace(/^-/, "");
  if (tokenMetadata) {
    const ticker = tokenMetadata.metadata.symbol;
    const amount = convertIntToFloat(
      qtyToken.toString(),
      tokenMetadata.decimals
    );
    swapped = `${formatNumber(amount)} ${ticker}`;
  }
  /* get other token information */
  let swappedFor = "unknown";
  const qtyOtherToken = balance_changes[otherTokenAddress].replace(/^-/, "");
  if (otherTokenMetadata) {
    console.log(otherTokenMetadata);
    let ticker = otherTokenMetadata.metadata.symbol;
    let swapQty = convertIntToFloat(
      qtyOtherToken.toString(),
      otherTokenMetadata.decimals
    );
    swappedFor = `${formatNumber(swapQty)} ${ticker}`;
  }
  const txnLink = (
    <div>
      <a href={`https://nearblocks.io/txns/${transaction_id}`} target="_blank">
        <FaExternalLinkAlt />
      </a>
    </div>
  );

  const row: TradeRow = {
    id: transaction_id,
    time,
    timestamp,
    swapped: type === "sell" ? swapped : swappedFor,
    swappedFor: type === "buy" ? swapped : swappedFor,
    price: "coming soon",
    maker: truncateString(trader, 20),
    txn: txnLink,
  };
  return row;
}
