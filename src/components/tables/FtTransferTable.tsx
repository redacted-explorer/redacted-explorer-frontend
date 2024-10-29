import TablePaginated from "../ui/TablePaginated";
import TableElementAccountId from "./ui-tables/TableElementAccountId";
import TableElementTime from "./ui-tables/TableElementTime";
import TableElementTransactionHash from "./ui-tables/TableElementTransactionHash";
import TableElementTransferAmount from "./ui-tables/TableElementTransferAmount";

type FtTransferEvent = {
  amount: `${number}`;
  block_height: number;
  block_timestamp_nanosec: number;
  memo: string | null;
  new_owner_id: string;
  old_owner_id: string;
  receipt_id: string;
  token_id: string;
  transaction_id: string;
}

export default function FtTransferTable({
  accountId,
  tokenId,
}: {
  accountId?: string;
  tokenId?: string;
}) {
  const baseFilter: { [key: string]: string } = {};
  if (accountId !== undefined) {
    baseFilter["involved_account_ids"] = [accountId].join(",")
  }
  if (tokenId !== undefined) {
    baseFilter["token_id"] = tokenId;
  }

  return (
    <div>
      <TablePaginated<FtTransferEvent>
        eventName="ft_transfer"
        baseFilters={baseFilter}
        customFilters={{}}
        columns={{
          "transactionId": {
            label: "TX HASH",
            getValue: (event: FtTransferEvent) => <TableElementTransactionHash transactionHash={event.transaction_id} />,
          },
          "time": {
            label: "TIME",
            getValue: (event: FtTransferEvent) => <TableElementTime timestampNanosec={event.block_timestamp_nanosec} />,
          },
          "sender": {
            label: "SENDER",
            getValue: (event: FtTransferEvent) => <TableElementAccountId accountId={event.old_owner_id} />,
          },
          "receiver": {
            label: "RECEIVER",
            getValue: (event: FtTransferEvent) => <TableElementAccountId accountId={event.new_owner_id} />,
          },
          "amount": {
            label: "AMOUNT",
            getValue: (event: FtTransferEvent) => <TableElementTransferAmount amount={BigInt(event.amount)} tokenId={event.token_id} />,
          },
        }}
      />
    </div>
  );
}
