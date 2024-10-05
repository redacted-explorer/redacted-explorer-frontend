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
import { useAsyncList } from "@react-stately/data";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Spinner } from "@nextui-org/react";
import { SiTaketwointeractivesoftware } from "react-icons/si";
import GlitchText from "../ui/LoadingGlitch";

type Row = [
  { id: number; key: string; trader: string; transaction_id: string }
];

const ENTRIES_PER_REQUEST = 50;

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

  const WEBSOCKET_URL = "wss://ws-events.intear.tech/events/trade_swap";
  const INIT_URL = `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=Newest&limit=${ENTRIES_PER_REQUEST}`;
  const [websocketInitialized, setWebsocketInitialized] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(Date.now());

  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);
  const [nearPrice, setNearPrice] = useState(0);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }
      let res = await fetch(cursor || INIT_URL, {
        signal,
      });
      let json = await res.json();
      setHasMore(json.length > 0);

      // return if Metadata has not been loaded
      if (!allTokensMetadata) return { items: [] };

      setIsLoading(false);
      const tableRowsTemp: TradeTableRow[] = json.map((date: any) => {
        const row = tradeEventToRow(
          date.event,
          tokenAddress,
          allTokensMetadata,
          date.id
        );
        return row;
      });

      return {
        items: tableRowsTemp,
        cursor: `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=BeforeId&id=${tableRowsTemp[tableRowsTemp.length - 1].id
          }&limit=${ENTRIES_PER_REQUEST}`,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  const { sendMessage } = useWebSocket(`${WEBSOCKET_URL}`, {
    onOpen: () => {
      console.log("opened");
      setWebsocketInitialized(false);
    },
    onMessage: (event) => {
      const trade = JSON.parse(event.data);
      let row = tradeEventToRow(trade, tokenAddress, allTokensMetadata);
      list.insert(0, row);
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
    list.reload();
  }, [allTokensMetadata]);

  useEffect(() => {
    if (websocketInitialized) return;
    sendMessage(
      JSON.stringify({ involved_token_account_ids: [tokenAddress] })
    );
    console.log("message sent");
    setWebsocketInitialized(true);
  }, [websocketInitialized]);

  return (
    <div>
      <div className="mt-4 flex flex-col justify-center h-[600px]">
        <Table
          isHeaderSticky
          aria-label="Example table with infinite pagination"
          baseRef={scrollerRef}
          bottomContent={
            hasMore ? (
              <div className="flex w-full justify-center">
                <Spinner ref={loaderRef} color="current" />
              </div>
            ) : null
          }
          classNames={{
            base: "overflow-scroll",
            table: "min-h-[400px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            items={list.items}
            loadingContent={
              <GlitchText isLoading={isLoading}>
                Loading...
              </GlitchText>
            }
          >
            {(item: any) => (
              <TableRow
                key={item.id}
                className={`fade-in ${item.type === "buy" ? "text-near-green-400" : "text-red-400"
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
    </div>
  );
}
