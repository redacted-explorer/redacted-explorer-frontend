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

type Trade = {
  id: number;
  date: number;
  type: "buy" | "sell";
  qtyFrom: number;
  qtyTo: number;
  otherTokenAddress: string;
  maker: string;
  txn: string;
};

const entriesPerPageOptions = [10, 25, 50];

export default function TradeHistoryTable({
  tokenAddress,
}: {
  tokenAddress: string;
}) {
  const columns = [
    { key: "type", label: "TYPE" },
    { key: "amount", label: "AMOUNT" },
    { key: "ticker", label: "TICKER" },
    { key: "near", label: "NEAR" },
    { key: "price", label: "PRICE" },
    { key: "maker", label: "MAKER" },
    { key: "txn", label: "TXN" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [trades, setTrades] = useState<Trade[] | null>(null);

  async function updateTransactions(url: string, sort: boolean = false) {
    console.log(url);
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((date: any) => {
            const { id } = date;
            const { block_timestamp_nanosec, balance_changes } = date.event;
            console.log(balance_changes);
          });

          /*          const transactions_temp: Trade[] = data.map((trade: any) => {
            const temp_trade: Trade = {
              id: 0,
              date: 0,
              type: "buy",
              qtyFrom: 0,
              qtyTo: 0,
              otherTokenAddress: "",
              maker: "",
              txn: "",
            };
            return trade;
          });
          if (sort) {
            transactions_temp.sort((a, b) => a.id - b.id);
          }
          setTrades(transactions_temp); */
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const initialFetch = async () => {
      updateTransactions(
        `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=Newest&limit=${entriesPerPage}`
      );
    };
    initialFetch();
  }, []);

  function previousPage() {}
  function nextPage() {}
  function updateEntriesPerPage(entries: number) {
    setEntriesPerPage(entries);
    updateTransactions(
      `https://events.intear.tech/query/tx_transaction?pagination_by=AfterId&id=${lastId}&limit=${entries}`
    );
  }
  /* 
  Necessary Information
  Token Ticker
  Token Price
  Current NEAR price
  Current Token Price in NEAR
  */
  return (
    <div>
      {trades && (
        <div className="flex flex-col justify-center">
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={trades}>
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
          {entriesPerPageOptions.map((amount) => (
            <Button key={amount} onClick={() => updateEntriesPerPage(amount)}>
              {amount}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
