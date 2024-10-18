"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import TablePaginated from "@/components/ui/TablePaginated";

type Transaction = {
  id: number;
  signerId: string;
  receiverId: string;
  transactionId: string;
};

const columns = [
  { key: "id", label: "ID" },
  { key: "signerId", label: "SIGNER" },
  { key: "receiverId", label: "RECEIVER" },
  { key: "transactionId", label: "TRANSACTION" },
];

const entriesPerPageList = [10, 25, 50];

export default function Page({ params }: { params: { address: string } }) {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [firstIndex, setFirstIndex] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  async function fetchTransactions(
    url: string,
    sort: boolean = false
  ): Promise<Transaction[]> {
    try {
      return fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("update transactions");
          const transactionsTemp: Transaction[] = data.map((tx: any) => {
            return {
              id: tx.id,
              signerId: tx.event.signer_id,
              receiverId: tx.event.receiver_id,
              transactionId: tx.event.transaction_id,
            };
          });
          if (sort) transactionsTemp.reverse();
          return transactionsTemp;
        });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      const txs = await fetchTransactions(
        `https://events.intear.tech/query/tx_transaction?pagination_by=Newest&limit=${entriesPerPage}`
      );
      setTransactions(txs);
      if (txs.length < entriesPerPage) setLastPage(true);
      setFirstId(txs[0].id);
      setLastId(txs[txs.length - 1].id);
    };
    initialFetch();
  }, []);

  async function nextPage() {
    const txs = await fetchTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=BeforeId&id=${lastId}&limit=${entriesPerPage}`
    );
    if (txs.length < entriesPerPage) {
      setLastPage(true);
      if (txs.length === 0) return;
    }
    if (firstPage) setFirstPage(false);
    setFirstIndex((previous) => previous + txs.length);
    setFirstId(txs[0].id);
    setLastId(txs[txs.length - 1].id);
    setTransactions(txs);
  }

  async function previousPage() {
    let afterId;
    if (firstIndex < entriesPerPage) {
      afterId = transactions![entriesPerPage - firstIndex].id;
      setFirstIndex(0);
      setFirstPage(true);
    } else {
      afterId = firstId;
      if (firstIndex == entriesPerPage) setFirstPage(true);
      setFirstIndex((prev) => prev - entriesPerPage);
    }
    const txs = await fetchTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=${afterId}&limit=${entriesPerPage}`,
      true
    );
    setFirstId(txs[0].id);
    setLastId(txs[txs.length - 1].id);
    setTransactions(txs);
  }

  async function updateEntriesPerPage(entries: number) {
    setEntriesPerPage(entries);
    if (!firstId) {
      console.log("No Entries");
      return;
    }
    const txs = await fetchTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=BeforeId&id=${
        firstId + 1
      }&limit=${entries}`
    );
    if (txs.length < entries) {
      setLastPage(true);
    }
    setFirstId(txs[0].id);
    setLastId(txs[txs.length - 1].id);
    setTransactions(txs);
  }

  return (
    <div>
      {transactions && (
        <TablePaginated
          columns={columns}
          rows={transactions}
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
