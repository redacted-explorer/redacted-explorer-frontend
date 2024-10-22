"use client";

import { useEffect, useState } from "react";
import {
  TokenData,
  TransactionData,
  TransactionTableRow,
} from "../../../types";
import { transactionDataToRow } from "../../../utils";
import TablePaginated from "../ui/TablePaginated";

export default function TransactionsTable({
  accountId,
}: {
  accountId: string;
}) {
  const entriesPerPageList = [10, 25, 50];
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [indexFirstEntry, setIndexFirstEntry] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [tableRows, setTableRows] = useState<TransactionTableRow[] | null>(
    null
  );
  const [initialized, setInitialized] = useState(false);
  const [metadataInitialized, setMetadataInitialized] = useState(false);
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);
  const columns = [
    { key: "transactionId", label: "TX HASH" },
    { key: "time", label: "TIME" },
    { key: "receiver", label: "RECEIVER" },
    { key: "blockHeight", label: "HEIGHT" },
  ];

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

  async function fetchTransactions(
    url: string,
    sort: boolean = false
  ): Promise<TransactionTableRow[]> {
    if (!allTokensMetadata) return [];
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      const tableRowsTemp: TransactionTableRow[] = data.map(
        (date: TransactionData) => {
          const row: TransactionTableRow = transactionDataToRow(date);
          return row;
        }
      );
      if (sort) {
        tableRowsTemp.reverse();
      }
      return tableRowsTemp;
    } catch (e) {
      return [];
    }
  }

  async function initializeTable() {
    const entries = await fetchTransactions(
      `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=Newest&limit=${entriesPerPage}`
    );
    if (entries.length === 0) {
      console.log("Transaction array is empty");
      return;
    }
    setFirstId(entries[0].id);
    setLastId(entries[entries.length - 1].id);
    setTableRows(entries);
    setInitialized(true);
  }

  async function updateEntriesPerPage(n: number) {
    setEntriesPerPage(n);
    if (!tableRows || tableRows.length === 0) return;
    const entries = await fetchTransactions(
      `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=BeforeId&id=${
        firstId! + 1
      }&limit=${n}`
    );
    if (entries.length < entriesPerPage) setLastPage(true);
    setLastId(entries[entries.length - 1].id);
    setTableRows(entries);
  }

  async function nextPage() {
    const entries = await fetchTransactions(
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
    const entries = await fetchTransactions(
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
