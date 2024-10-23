"use client";

import { SetStateAction, useEffect, useState } from "react";
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
  const columns = [
    { key: "transactionId", label: "TX HASH" },
    { key: "time", label: "TIME" },
    { key: "receiver", label: "RECEIVER" },
    { key: "blockHeight", label: "HEIGHT" },
  ];

  function getInitializeTableUrl(entriesPerPage: number): string {
    return `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=Newest&limit=${entriesPerPage}`;
  }

  function getUpdateEntriesPerPageUrl(
    id: number,
    entriesPerPage: number
  ): string {
    return `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=BeforeId&id=${
      id + 1
    }&limit=${entriesPerPage}`;
  }

  function getNextPageUrl(id: number, entriesPerPage: number): string {
    return `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=BeforeId&id=${id}&limit=${entriesPerPage}`;
  }

  function getPreviousPageUrl(id: number, entriesPerPage: number): string {
    return `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=AfterId&id=${id}&limit=${entriesPerPage}`;
  }

  async function fetchTransactions(
    url: string,
    allTokensMetadata: Record<string, TokenData> | null,
    sort: boolean | undefined = false
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

  return (
    <div>
      <TablePaginated
        fetchRows={fetchTransactions}
        columns={columns}
        entriesPerPageList={entriesPerPageList}
        getInitializeTableUrl={getInitializeTableUrl}
        getUpdateEntriesPerPageUrl={getUpdateEntriesPerPageUrl}
        getNextPageUrl={getNextPageUrl}
        getPreviousPageUrl={getPreviousPageUrl}
      />
    </div>
  );
}
