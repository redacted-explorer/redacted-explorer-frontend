"use client";
import { useEffect, useState } from "react";
import { TradeRow, TokenMetadata, tradeEventToRow } from "../../../utils";
import useWebSocket from "react-use-websocket";

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

export default function LiveTradeTable() {
  const columns = [
    { key: "time", label: "TIME" },
    { key: "swapped", label: "SOLD" },
    { key: "swappedFor", label: "BOUGHT" },
    { key: "price", label: "PRICE" },
    { key: "maker", label: "MAKER" },
    { key: "txn", label: "TXN" },
  ];
  const WEBSOCKET_URL = "wss://ws-events.intear.tech/events/trade_swap";
  const [initialized, setInitialized] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const initUrl = `https://events.intear.tech/query/trade_swap?pagination_by=Newest&limit=${entriesPerPage}`;
  const [tableRows, setTableRows] = useState<TradeRow[] | null>(null);
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);

  async function initTrades(url: string, sort: boolean = false) {
    if (!allTokensMetadata) return;
    console.log(url);
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const tableRowsTemp = data.map((date: any) =>
            tradeEventToRow(date.event, allTokensMetadata)
          );
          setTableRows(tableRowsTemp);
        });
    } catch (error) {
      console.log(error);
    }
  }

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
    initTrades(initUrl);
  }, [allTokensMetadata]);

  const { sendMessage } = useWebSocket(`${WEBSOCKET_URL}`, {
    onOpen: () => {
      console.log("opened");
      setInitialized(false);
    },
    onMessage: (event) => {
      let trade = JSON.parse(event.data);
      let row = tradeEventToRow(trade, allTokensMetadata);
      setTableRows((previousRows) => {
        if (!previousRows) return previousRows;
        let tempRows = [...previousRows];
        tempRows.pop();
        return [row].concat(tempRows);
      });
    },
  });

  useEffect(() => {
    if (initialized) return;
    sendMessage(JSON.stringify({}));
    setInitialized(true);
  }, [initialized]);

  return (
    <div>
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
                <TableRow key={item.id} className="fade-in">
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
