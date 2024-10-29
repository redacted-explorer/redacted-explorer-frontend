import TablePaginated from "../ui/TablePaginated";
import TableElementAccountId from "./ui-tables/TableElementAccountId";
import TableElementTime from "./ui-tables/TableElementTime";
import TableElementTransactionHash from "./ui-tables/TableElementTransactionHash";
import TableElementTransferAmount from "./ui-tables/TableElementTransferAmount";

type TradeEvent = {
  balance_changes: { [key: string]: `${number}` },
  block_height: number;
  block_timestamp_nanosec: number;
  receipt_id: string;
  trader: string;
  transaction_id: string;
}

export default function TradeHistoryTable({
  tokenId,
}: {
  tokenId: string;
}) {
  return (
    <div>
      <TablePaginated<TradeEvent>
        eventName="trade_swap"
        baseFilters={{
          "involved_token_account_ids": [tokenId].join(","),
        }}
        customFilters={{}}
        columns={{
          "transactionId": {
            label: "TX HASH",
            getValue: (event: TradeEvent) => <TableElementTransactionHash transactionHash={event.transaction_id} />,
          },
          "time": {
            label: "TIME",
            getValue: (event: TradeEvent) => <TableElementTime timestampNanosec={event.block_timestamp_nanosec} />,
          },
          "type": {
            label: "TYPE",
            getValue: (event: TradeEvent) => parseInt(event.balance_changes[tokenId])
              ? parseInt(event.balance_changes[tokenId]) < 0
                ? "sell"
                : "buy"
              : "Arbitrage",
          },
          "fromAmount": {
            label: "AMOUNT",
            getValue: (event: TradeEvent) => event.balance_changes[tokenId]
              ? <TableElementTransferAmount tokenId={tokenId} amount={BigInt(event.balance_changes[tokenId].replace(/^-/, ""))} />
              : "0 🤡"
          },
          "swappedFor": {
            label: "SWAPPED FOR",
            getValue: (event: TradeEvent) => {
              let otherTokenId = Object.keys(event.balance_changes).find(
                (key) => key !== tokenId
              );
              if (otherTokenId === undefined) {
                return "Arbitrage";
              } else if (event.balance_changes[otherTokenId]) {
                return <TableElementTransferAmount tokenId={otherTokenId} amount={BigInt(event.balance_changes[otherTokenId].replace(/^-/, ""))} />;
              } else {
                return "0 🤡";
              }
            }
          },
          "trader": {
            label: "TRADER",
            getValue: (event: TradeEvent) => <TableElementAccountId accountId={event.trader} />,
          },
        }}
      />
    </div>
  );
}
