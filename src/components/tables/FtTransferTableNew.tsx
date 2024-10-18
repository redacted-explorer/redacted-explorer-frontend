"use client";

import { useState } from "react";
import TablePaginated from "../ui/TablePaginated";
import {
  convertIntToFloat,
  formatNumber,
  timestampToTimeDifference,
} from "../../../utils";
import { FaExternalLinkAlt } from "react-icons/fa";
const entriesPerPageOptions = [10, 25, 50];
type Row = {
  id: number;
  time: string;
  transfer: string;
  sender: string;
  receiver: string;
  amount: string;
  price: string;
  txn: React.ReactNode;
};
type Transfer = {
  id: number;
  timestamp: number;
  sender: string;
  receiver: string;
  amount: string;
  tokenId: string;
  txn: string;
};
export default function FtTransferTableNew({
  accountId,
}: {
  accountId: string;
}) {
  const columns = [
    { key: "time", label: "TIME" },
    { key: "transfer", label: "TRANSFER" },
    { key: "sender", label: "FROM" },
    { key: "receiver", label: "TO" },
    { key: "price", label: "PRICE" },
    { key: "txn", label: "TXN" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [firstEntry, setFirstEntry] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [latestTimestamp, setLatestTimestamp] = useState<number | null>(null);
  const [tableRows, setTableRows] = useState<Row[] | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);

  async function fetchTransfers(
    url: string,
    sort: boolean = false
  ): Promise<Row[]> {
    if (!allTokensMetadata) return [];
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    const tableRowsTemp: Row[] = data.map((date: any) => {
      const { id } = date;
      const sender = date.event.old_owner_id;
      const receiver = date.event.new_owner_id;
      const time = timestampToTimeDifference(
        date.event.block_timestamp_nanosec
      );
      let amount = date.event.amount;
      let tokenId = date.event.token_id;
      let price = "unknown";
      const tokenMetadata = allTokensMetadata[tokenId].metadata;
      if (tokenMetadata) {
        const currentPrice = tokenMetadata.price;
        amount = convertIntToFloat(amount, tokenMetadata.decimals);
        tokenId = tokenMetadata.symbol;
        price = formatNumber(Number(amount) * currentPrice);
      }
      const txn = (
        <div>
          <a
            href={`https://nearblocks.io/txns/${transfer.txn}`}
            target="_blank"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      );
      const row: Row = {
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
    });
    return tableRowsTemp;
  }

  return (
    <TablePaginated
      columns={[]}
      rows={[]}
      firstPage={false}
      lastPage={false}
      entriesPerPageList={[]}
      updateEntriesPerPage={function (n: number): {} {
        throw new Error("Function not implemented.");
      }}
      nextPage={function (): {} {
        throw new Error("Function not implemented.");
      }}
      previousPage={function (): {} {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
