"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import useWebSocket from "react-use-websocket";

export default function TradeHistoryInfiniteTable() {
  const WEBSOCKET_URL = "wss://ws-events.intear.tech/events/trade_swap";
  const INIT_URL = `https://events.intear.tech/query/trade_swap?&pagination_by=Newest&limit=30`;
  const [hasMore, setHasMore] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [websocketInitialized, setWebsocketInitialized] = useState(true);

  let list = useAsyncList({
    getKey: (item: any) => item.id,
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }
      console.log("loading");
      let res = await fetch(cursor || INIT_URL, {
        signal,
      });
      let json = await res.json();
      setHasMore(json.length > 0);
      let items = json.map((date: any) => {
        return { id: date.id };
      });
      return {
        items,
        cursor: `https://events.intear.tech/query/trade_swap?pagination_by=BeforeId&id=${
          items[items.length - 1].id
        }&limit=10`,
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
      const txn = JSON.parse(event.data).transaction_id;
      console.log(txn);
      list.insert(0, { id: txn });
    },
  });

  useEffect(() => {
    if (websocketInitialized) return;
    sendMessage(JSON.stringify({}));
    console.log("message sent");
    setWebsocketInitialized(true);
  }, [websocketInitialized]);

  return (
    <div className="flex flex-col justify-center items-center">
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
          base: "max-h-[320px] max-w-[320px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner color="white" />}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/*       <div>
        {list.items.map((item: any) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
      <Button onClick={list.loadMore}>Load More</Button>
      <div>Oldest: {oldestId}</div> */}
    </div>
  );
}
