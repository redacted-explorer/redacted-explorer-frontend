import TablePaginated from "../ui/TablePaginated";
import TableElementAccountId from "./ui-tables/TableElementAccountId";
import TableElementTime from "./ui-tables/TableElementTime";
import TableElementTransactionHash from "./ui-tables/TableElementTransactionHash";
import TableElementTransferAmount from "./ui-tables/TableElementTokenAmount";

type TradeEvent = {
  balance_changes: { [key: string]: `${number}` },
  block_height: number;
  block_timestamp_nanosec: number;
  receipt_id: string;
  trader: string;
  transaction_id: string;
}

type TradeEventFilter = {
  involved_token_account_ids?: string;
}

export default function AllTokensTradeHistoryTable() {
  return (
    <div>
      <TablePaginated<TradeEvent>
        eventName="trade_swap"
        baseFilter={{} as TradeEventFilter}
        customFilter={{}}
        columns={{
          "transactionId": {
            label: "TX HASH",
            getValue: (event: TradeEvent) => <TableElementTransactionHash transactionHash={event.transaction_id} />,
          },
          "time": {
            label: "TIME",
            getValue: (event: TradeEvent) => <TableElementTime timestampNanosec={event.block_timestamp_nanosec} />,
          },
          "fromAmount": {
            label: "TOKEN IN",
            getValue: (event: TradeEvent) => Object.entries(event.balance_changes).length >= 1
              ? <TableElementTransferAmount tokenId={Object.keys(event.balance_changes)[0]} amount={BigInt(Object.values(event.balance_changes)[0].replace(/^-/, ""))} />
              : "0 🤡"
          },
          "swappedFor": {
            label: "TOKEN OUT",
            getValue: (event: TradeEvent) => {
              let otherTokenId = Object.keys(event.balance_changes)[1];
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
