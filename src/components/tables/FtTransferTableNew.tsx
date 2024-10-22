"use client";

import { useEffect, useState } from "react";
import TablePaginated from "../ui/TablePaginated";
import {
  convertIntToFloat,
  formatNumber,
  timestampToTimeDifference,
} from "../../../utils";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TransactionData } from "../../../types";
const entriesPerPageList = [10, 25, 50];
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

export default function FtTransferTableNew({
  accountId,
}: {
  accountId: string;
}) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "time", label: "TIME" },
    { key: "transfer", label: "TRANSFER" },
    { key: "sender", label: "FROM" },
    { key: "receiver", label: "TO" },
    { key: "price", label: "PRICE" },
    { key: "txn", label: "TXN" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [indexFirstEntry, setIndexFirstEntry] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [tableRows, setTableRows] = useState<Row[] | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [metadataInitialized, setMetadataInitialized] = useState(false);
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);

  async function fetchTransfers(
    url: string,
    sort: boolean = false
  ): Promise<Row[]> {
    if (!allTokensMetadata) return [];
    try {
      console.log(url);
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      const tableRowsTemp: Row[] = data.map((date: TransactionData) => {
        const { id } = date;
        const sender = date.event.old_owner_id;
        const receiver = date.event.new_owner_id;
        const time = timestampToTimeDifference(
          date.event.block_timestamp_nanosec
        );
        let amount = date.event.amount.toString();
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
              href={`https://nearblocks.io/txns/${date.event.transaction_id}`}
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
      if (sort) {
        tableRowsTemp.reverse();
      }
      return tableRowsTemp;
    } catch (e) {
      return [];
    }
  }

  if (tableRows) {
    console.log(firstId, tableRows[0]);
  }

  useEffect(() => {
    if (initialized || !metadataInitialized) return;
    initializeTable();
  }, [metadataInitialized]);

  useEffect(() => {
    if (metadataInitialized) return;
    try {
      fetch("https://prices.intear.tech/tokens", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setAllTokensMetadata(data);
          setMetadataInitialized(true);
        });
    } catch (e) {
      console.log(e);
    }
  });

  async function initializeTable() {
    const entries = await fetchTransfers(
      `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=Newest&limit=${entriesPerPage}`
    );
    setFirstId(entries[0].id);
    setLastId(entries[entries.length - 1].id);
    setTableRows(entries);
    setInitialized(true);
  }

  async function updateEntriesPerPage(n: number) {
    setEntriesPerPage(n);
    if (!tableRows || tableRows.length === 0) return;
    const entries = await fetchTransfers(
      `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=BeforeId&id=${
        firstId! + 1
      }&limit=${n}`
    );
    if (entries.length < entriesPerPage) setLastPage(true);
    setLastId(entries[entries.length - 1].id);
    setTableRows(entries);
  }

  async function nextPage() {
    const entries = await fetchTransfers(
      `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=BeforeId&id=${lastId}&limit=${entriesPerPage}`
    );
    if (entries.length < entriesPerPage) {
      setLastPage(true);
      if (entries.length === 0) return;
    }
    setFirstId(entries[0].id);
    setLastId(entries[entries.length - 1].id);
    setIndexFirstEntry((prev) => prev + entriesPerPage);
    setFirstPage(false);
    setTableRows(entries);
  }

  async function previousPage() {
    if (!tableRows || tableRows.length === 0) return;
    let id = firstId;
    if (indexFirstEntry <= entriesPerPage) {
      id = tableRows[entriesPerPage - indexFirstEntry].id;
      console.log(tableRows[entriesPerPage - indexFirstEntry]);
      setIndexFirstEntry(0);
      setFirstPage(true);
    } else {
      setIndexFirstEntry((prev) => prev - entriesPerPage);
    }
    const entries = await fetchTransfers(
      `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=AfterId&id=${id}&limit=${entriesPerPage}`,
      true
    );
    setFirstId(entries[0].id);
    setLastId(entries[entries.length - 1].id);
    if (entries.length === entriesPerPage) setLastPage(false);
    setTableRows(entries);
  }

  return (
    <div>
      {tableRows && (
        <TablePaginated
          columns={columns}
          rows={tableRows}
          firstPage={firstPage}
          lastPage={lastPage}
          entriesPerPageList={entriesPerPageList}
          updateEntriesPerPage={updateEntriesPerPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  );
}
