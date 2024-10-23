"use client";

import TablePaginated from "../ui/TablePaginated";
import { ftTransferEventToRow } from "../../../utils";
import { TokenData, TokenTransferData } from "../../../types";
import { TokenTransferTableRow } from "../../../types";

export default function FtTransferTableNew({
  accountId,
}: {
  accountId: string;
}) {
  const entriesPerPageList = [10, 25, 50];
  const columns = [
    { key: "id", label: "ID" },
    { key: "time", label: "TIME" },
    { key: "transfer", label: "TRANSFER" },
    { key: "sender", label: "FROM" },
    { key: "receiver", label: "TO" },
    { key: "price", label: "PRICE" },
    { key: "txn", label: "TXN" },
  ];

  async function fetchTransfers(
    url: string,
    allTokensMetadata: Record<string, TokenData> | null,
    sort: boolean = false
  ): Promise<TokenTransferTableRow[]> {
    if (!allTokensMetadata) return [];
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      const tableRowsTemp: TokenTransferTableRow[] = data.map(
        (date: TokenTransferData) => {
          const tokenData: TokenData = allTokensMetadata[date.event.token_id];
          if (tokenData) {
            return ftTransferEventToRow(date, tokenData);
          }
          return ftTransferEventToRow(date);
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

  return (
    <div>
      <TablePaginated
        fetchRows={fetchTransfers}
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
