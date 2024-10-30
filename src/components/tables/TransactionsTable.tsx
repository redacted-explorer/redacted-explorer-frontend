import TablePaginated from "../ui/TablePaginated";
import TableElementAccountId from "./ui-tables/TableElementAccountId";
import TableElementTime from "./ui-tables/TableElementTime";
import TableElementTransactionHash from "./ui-tables/TableElementTransactionHash";

type TransactionEvent = {
  actions: any[];
  block_height: number;
  block_timestamp_nanosec: number;
  nonce: number;
  priority_fee: number | null;
  public_key: string;
  receiver_id: string;
  signature: string;
  signer_id: string;
  transaction_id: string;
}

type TransactionEventFilter = {
  signer_id?: string;
  receiver_id?: string;
}

export default function TransactionsTable({
  signerId,
  receiverId,
}: {
  signerId?: string;
  receiverId?: string;
}) {
  const baseFilters: TransactionEventFilter = {};
  if (signerId !== undefined) {
    baseFilters["signer_id"] = signerId;
  }
  if (receiverId !== undefined) {
    baseFilters["receiver_id"] = receiverId;
  }

  return (
    <div>
      <TablePaginated<TransactionEvent>
        eventName="tx_transaction"
        baseFilter={baseFilters}
        customFilter={{}}
        columns={{
          "transactionId": {
            label: "TX HASH",
            getValue: (event: TransactionEvent) => <TableElementTransactionHash transactionHash={event.transaction_id} />,
          },
          "time": {
            label: "TIME",
            getValue: (event: TransactionEvent) => <TableElementTime timestampNanosec={event.block_timestamp_nanosec} />,
          },
          "signerId": {
            label: "SENDER",
            getValue: (event: TransactionEvent) => <TableElementAccountId accountId={event.signer_id} />,
          },
          "receiverId": {
            label: "INTERACTED WITH",
            getValue: (event: TransactionEvent) => <TableElementAccountId accountId={event.receiver_id} />,
          },
        }}
      />
    </div>
  );
}
