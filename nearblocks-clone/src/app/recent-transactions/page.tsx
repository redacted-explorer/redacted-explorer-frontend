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

type Transaction = {
  id: number;
  signerId: string;
  receiverId: string;
  transactionId: string;
};

const columns = [
  { key: "signerId", label: "SIGNER" },
  { key: "receiverId", label: "RECEIVER" },
  { key: "transactionId", label: "TRANSACTION" },
];

const resultsPerPage = [10, 25, 50];

export default function Page({ params }: { params: { address: string } }) {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  async function updateTransactions(url: string, sort: boolean = false) {
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("update transactions");
          const transactions_temp: Transaction[] = data.map((tx: any) => {
            return {
              id: tx.id,
              signerId: tx.event.signer_id,
              receiverId: tx.event.receiver_id,
              transactionId: tx.event.transaction_id,
            };
          });
          if (sort) {
            transactions_temp.sort((a, b) => a.id - b.id);
          }
          setTransactions(transactions_temp);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      updateTransactions(
        `https://events.intear.tech/query/tx_transaction?pagination_by=Newest&limit=${entriesPerPage}`
      );
    };
    initialFetch();
  }, []);

  useEffect(() => {
    if (!transactions) return;
    console.log(transactions);
    setFirstId(transactions[0].id);
    setLastId(transactions[transactions.length - 1].id);
  }, [transactions]);

  function nextPage() {
    updateTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=${lastId}&limit=${entriesPerPage}`
    );
    setPage((prev) => prev + 1);
  }

  function previousPage() {
    updateTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=BeforeId&id=${firstId}&limit=${entriesPerPage}`,
      true
    );
    setPage((prev) => prev - 1);
  }

  function updateEntriesPerPage(entries: number) {
    setEntriesPerPage(entries);
    updateTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=${lastId}&limit=${entries}`
    );
  }

  return (
    <div>
      {transactions && (
        <div className="flex flex-col justify-center">
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={transactions}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex flex-col gap-2 ml-4 my-2">
        <div className="flex gap-2">
          {page === 0 ? (
            <Button isDisabled>Previous</Button>
          ) : (
            <Button onClick={previousPage}>Previous</Button>
          )}
          <Button onClick={nextPage}>Next</Button>
        </div>
        <div>Results Per Page</div>
        <div className="flex gap-2">
          {resultsPerPage.map((amount) => (
            <Button key={amount} onClick={() => updateEntriesPerPage(amount)}>
              {amount}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
