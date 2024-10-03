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
  tradeEventToRow,
  TradeTableRow,
  truncateString,
} from "../../../utils";
import { FaExternalLinkAlt } from "react-icons/fa";
import useWebSocket from "react-use-websocket";

type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
  priceUsd: string;
};

type Trade = {
  id: number;
  timestamp: number;
  type: "buy" | "sell";
  qtyToken: number;
  qtyOtherToken: number;
  otherTokenAddress: string;
  maker: string;
  txn: string;
};

type Row = {
  id: number;
  time: string;
  type: "buy" | "sell";
  amount: string;
  for: string;
  price: string;
  maker: string;
  txn: React.ReactNode;
};

const entriesPerPageOptions = [10, 25, 50];

export default function TradeHistoryTable({
  tokenAddress,
}: {
  tokenAddress: string;
}) {
  const columns = [
    { key: "time", label: "TIME" },
    { key: "type", label: "TYPE" },
    { key: "fromAmount", label: "AMOUNT" },
    { key: "swappedFor", label: "SWAPPED" },
    { key: "price", label: "PRICE" },
    { key: "maker", label: "MAKER" },
    { key: "txn", label: "TXN" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const WEBSOCKET_URL = "wss://ws-events.intear.tech/events/trade_swap";
  const initUrl = `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=Newest&limit=${entriesPerPage}`;
  const [firstEntry, setFirstEntry] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [latestTimestamp, setLatestTimestamp] = useState<number | null>(null);
  const [tableRows, setTableRows] = useState<TradeTableRow[] | null>(null);
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);
  const [nearPrice, setNearPrice] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(
    null
  );

  async function updateTrades(url: string, sort: boolean = false) {
    if (!allTokensMetadata) return;
    console.log(url);
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const tableRowsTemp: TradeTableRow[] = data.map((date: any) =>
            tradeEventToRow(date.event, tokenAddress, allTokensMetadata)
          );

          if (tableRowsTemp[0]) {
            setLastId(tableRowsTemp[0].id);
            setFirstId(tableRowsTemp[tableRowsTemp.length - 1].id);
            setLatestTimestamp(tableRowsTemp[0].timestamp);
            setTableRows(tableRowsTemp);
          } else {
            console.log("No trading data found");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const { sendMessage } = useWebSocket(`${WEBSOCKET_URL}`, {
    onOpen: () => {
      console.log("opened");
    },
    onMessage: (event) => {
      let trade = JSON.parse(event.data);
      let row = tradeEventToRow(trade, tokenAddress, allTokensMetadata);
      setTableRows((previousRows) => {
        if (!previousRows) return previousRows;
        let tempRows = [...previousRows];
        tempRows.pop();
        return [row].concat(tempRows);
      });
    },
  });

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

  useEffect(() => {
    if (!allTokensMetadata) return;
    updateTrades(initUrl);
  }, [allTokensMetadata]);

  function updateEntriesPerPage(entries: number) {
    setEntriesPerPage(entries);
    if (!latestTimestamp) return;
    updateTrades(
      `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=BeforeTimestamp&timestamp_nanosec=${
        Number(latestTimestamp) + 10000
      }&limit=${entries}`
    );
  }

  useEffect(() => {
    if (initialized) return;
    sendMessage(JSON.stringify({ involved_token_account_ids: [tokenAddress] }));
    setInitialized(true);
  }, []);

  function handleScroll() {
    console.log("scroll");
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
      {tableRows && (
        <div className="mt-4 flex flex-col justify-center h-[300px]">
          <Table className="h-full">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={tableRows}>
              {(item) => (
                <TableRow
                  key={item.id}
                  className={`fade-in ${
                    item.type === "buy" ? "bg-green-200" : "bg-red-200"
                  }`}
                >
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
