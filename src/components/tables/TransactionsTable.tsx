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
  signerId,
  receiverId,
}: {
  signerId?: string;
  receiverId?: string;
}) {
  const entriesPerPageList = [10, 25, 50];
  const columns = [
    { key: "time", label: "TIME" },
    { key: "blockHeight", label: "BLOCK" },
  ];
  if (receiverId === undefined) {
    columns.push({ key: "receiver", label: "INTERACTION WITH" });
  }
  if (signerId === undefined) {
    columns.push({ key: "signer", label: "SENDER" });
  }
  columns.push({ key: "transactionId", label: "TX HASH" })

  function createFilters({ signerId, receiverId }: { signerId?: string; receiverId?: string }) {
    const urlParams = new URLSearchParams();
    if (signerId) {
      urlParams.append("signer_id", signerId);
    }
    if (receiverId) {
      urlParams.append("receiver_id", receiverId);
    }
    return urlParams.toString();
  }

  function getInitializeTableUrl(entriesPerPage: number): string {
    return `https://events.intear.tech/query/tx_transaction?${createFilters({ signerId, receiverId })}&pagination_by=Newest&limit=${entriesPerPage}`;
  }

  function getUpdateEntriesPerPageUrl(
    id: number,
    entriesPerPage: number
  ): string {
    return `https://events.intear.tech/query/tx_transaction?${createFilters({ signerId, receiverId })}&pagination_by=BeforeId&id=${id + 1
      }&limit=${entriesPerPage}`;
  }

  function getNextPageUrl(id: number, entriesPerPage: number): string {
    return `https://events.intear.tech/query/tx_transaction?${createFilters({ signerId, receiverId })}&pagination_by=BeforeId&id=${id}&limit=${entriesPerPage}`;
  }

  function getPreviousPageUrl(id: number, entriesPerPage: number): string {
    return `https://events.intear.tech/query/tx_transaction?${createFilters({ signerId, receiverId })}&pagination_by=AfterId&id=${id}&limit=${entriesPerPage}`;
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
