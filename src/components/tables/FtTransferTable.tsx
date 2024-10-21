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
import {
  convertIntToFloat,
  formatNumber,
  timestampToTimeDifference,
  truncateString,
} from "../../../utils";
import { FaExternalLinkAlt } from "react-icons/fa";

type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
  priceUsd: string;
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

const entriesPerPageOptions = [10, 25, 50];

export default function TransferTable({ accountId }: { accountId: string }) {
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
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);
  const initUrl = `https://events.intear.tech/query/ft_transfer?involved_account_ids=${accountId}&pagination_by=Newest&limit=${entriesPerPage}`;

  async function updateTransfers(url: string, sort: boolean = false) {
    if (!allTokensMetadata) return;
    try {
      fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          const transfers: Transfer[] = data.map((date: any) => {
            const { id } = date;
            const {
              amount,
              block_timestamp_nanosec,
              new_owner_id,
              old_owner_id,
              token_id,
              transaction_id,
            } = date.event;
            return {
              id,
              timestamp: block_timestamp_nanosec,
              sender: old_owner_id,
              receiver: new_owner_id,
              amount,
              tokenId: token_id,
              txn: transaction_id,
            };
          });
          if (sort) {
            transfers.sort((a, b) => b.id - a.id);
          }
          /* populate rows*/
          const tableRowsTemp = transfers.map((transfer) => {
            const tokenMetadata = allTokensMetadata[transfer.tokenId].metadata;
            const currentPrice = allTokensMetadata[transfer.tokenId].price_usd;
            const { id, sender, receiver } = transfer;
            const time = timestampToTimeDifference(transfer.timestamp);
            let amount = transfer.amount;
            let tokenId = transfer.tokenId;
            let price = "unknown";
            if (tokenMetadata) {
              amount = convertIntToFloat(
                transfer.amount,
                tokenMetadata.decimals
              );
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

          setLastId(tableRowsTemp[0].id);
          setFirstId(tableRowsTemp[tableRowsTemp.length - 1].id);
          setLatestTimestamp(transfers[0].timestamp);
          setTableRows(tableRowsTemp);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!allTokensMetadata) return;
    updateTransfers(initUrl);
  }, [allTokensMetadata]);

  useEffect(() => {
    try {
      fetch("https://prices.intear.tech/tokens", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setAllTokensMetadata(data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function nextPage() {}
  function previousPage() {}
  function updateEntriesPerPage(entries: number) {}

  return (
    <div>
      <div className="flex flex-col gap-2 ml-4 my-2">
        <div className="flex gap-2">
          {firstEntry === 0 ? (
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
      {tableRows && (
        <div className="flex flex-col justify-center">
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={tableRows}>
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
          {firstEntry === 0 ? (
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
