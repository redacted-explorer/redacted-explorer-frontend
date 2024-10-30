import TablePaginated from "../ui/TablePaginated";
import TableElementAccountId from "./ui-tables/TableElementAccountId";
import TableElementTime from "./ui-tables/TableElementTime";
import TableElementTransactionHash from "./ui-tables/TableElementTransactionHash";
import TableElementTransferAmount from "./ui-tables/TableElementTokenAmount";
import CopyButton from "../ui/CopyButton";

type BlockInfoEvent = {
  block_hash: string;
  block_height: number;
  block_producer: string;
  block_timestamp_nanosec: number;
  receipt_count: number;
  transaction_count: number;
}

type BlockInfoEventFilter = {
}

export default function BlockInfoTable({ entriesPerPage }: { entriesPerPage: number }) {
  return (
    <div>
      <TablePaginated<BlockInfoEvent>
        entriesPerPage={entriesPerPage}
        eventName="block_info"
        baseFilter={{} as BlockInfoEventFilter}
        customFilter={{}}
        columns={{
          "blockHash": {
            label: "BLOCK HASH",
            getValue: (event: BlockInfoEvent) => <span>{event.block_hash} <CopyButton text={event.block_hash} /></span>,
          },
          "time": {
            label: "TIME",
            getValue: (event: BlockInfoEvent) => <TableElementTime timestampNanosec={event.block_timestamp_nanosec} />,
          },
          "producer": {
            label: "PRODUCER",
            getValue: (event: BlockInfoEvent) => <TableElementAccountId accountId={event.block_producer} />,
          },
          "transactionCount": {
            label: "TRANSACTIONS",
            getValue: (event: BlockInfoEvent) => event.transaction_count,
          },
          "receiptCount": {
            label: "RECEIPTS",
            getValue: (event: BlockInfoEvent) => event.receipt_count,
          },
        }}
      />
    </div>
  );
}
