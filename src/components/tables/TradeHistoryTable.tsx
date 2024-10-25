"use client";
import { useEffect, useState } from "react";
import { TradeTableRow } from "../../../types";
import { tradeEventToRow } from "../../../utils";
import useWebSocket from "react-use-websocket";
import { useAsyncList } from "@react-stately/data";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { TimeProvider } from "../ui/TimeAgo";
import TableInfiniteScroll from "../ui/TableInfiniteScroll";

const ENTRIES_PER_REQUEST = 50;

export default function TradeHistoryTable({
  tokenAddress,
}: {
  tokenAddress: string;
}) {
  const columns = [
    { key: "time", label: "TIME" },
    { key: "blockHeight", label: "BLOCK" },
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

  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);

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
      if (!allTokensMetadata) {
        return { items: [] };
      }

      setIsLoading(false);
      const tableRowsTemp: TradeTableRow[] = json.map(
        (data: any, i: number) => {
          const row = tradeEventToRow(
            data.event,
            tokenAddress,
            allTokensMetadata,
            data.id
          );
          return row;
        }
      );

      return {
        items: tableRowsTemp,
        cursor: `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=BeforeId&id=${tableRowsTemp[tableRowsTemp.length - 1].id
          }&limit=${ENTRIES_PER_REQUEST}`,
      };
    },
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
    sendMessage(JSON.stringify({ involved_token_account_ids: [tokenAddress] }));
    console.log("message sent");
    setWebsocketInitialized(true);
  }, [websocketInitialized]);

  return (
    <div className="mt-4 flex flex-col justify-center h-[600px]">
      <TableInfiniteScroll
        hasMore={hasMore}
        isLoading={isLoading}
        list={list}
        columns={columns}
      />
    </div>
  );
}
