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
import { convertIntToFloat, timestampToTimeDifference } from "../../../utils";
import { FaExternalLinkAlt } from "react-icons/fa";

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

type Column = {
  id: number;
  time: string;
  type: "buy" | "sell";
  amount: string;
  ticker: string;
  for: string;
  near: string;
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
    { key: "amount", label: "AMOUNT" },
    { key: "ticker", label: "TICKER" },
    { key: "for", label: "FOR" },
    { key: "near", label: "NEAR" },
    { key: "price", label: "PRICE" },
    { key: "maker", label: "MAKER" },
    { key: "txn", label: "TXN" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const initUrl = `https://events.intear.tech/query/trade_swap?involved_token_account_ids=${tokenAddress}&pagination_by=Newest&limit=${entriesPerPage}`;
  const [page, setPage] = useState(0);
  const [firstId, setFirstId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [trades, setTrades] = useState<Trade[] | null>(null);
  const [tableColumns, setTableColumns] = useState<Column[] | null>(null);
  const [allTokensMetadata, setAllTokensMetadata] = useState<any>(null);
  const [nearPrice, setNearPrice] = useState(0);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(
    null
  );
  const [loadingData, setLoadingData] = useState(true);

  async function updateTrades(url: string, sort: boolean = false) {
    if (!tokenMetadata || !allTokensMetadata) return;
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          /* populate the trades list */
          const tradesTemp: Trade[] = data.map((date: any) => {
            const { id } = date;
            const {
              block_timestamp_nanosec,
              balance_changes,
              trader,
              transaction_id,
            } = date.event;
            const otherToken =
              Object.keys(balance_changes)[0] === tokenAddress
                ? Object.keys(balance_changes)[1]
                : Object.keys(balance_changes)[0];

            /* get rid of the - in front of the string */

            return {
              id,
              timestamp: block_timestamp_nanosec,
              type: balance_changes[tokenAddress] < 0 ? "sell" : "buy",
              qtyToken: balance_changes[tokenAddress].replace(/^-/, ""),
              qtyOtherToken: balance_changes[otherToken].replace(/^-/, ""),
              otherTokenAddress: otherToken,
              maker: trader,
              txn: transaction_id,
            };
          });

          if (sort) {
            tradesTemp.sort((a, b) => a.id - b.id);
          }
          setTrades(tradesTemp);

          /* populate the columns list */
          const tableColumnsTemp = tradesTemp.map((trade: Trade) => {
            const otherToken = allTokensMetadata[trade.otherTokenAddress];
            const time = timestampToTimeDifference(trade.timestamp);
            const amount = convertIntToFloat(
              trade.qtyToken.toString(),
              tokenMetadata.decimals
            );

            let ticker = "unknown";
            let swapQty = "unknown";
            let swapQtyNear = "unkown";
            let price = "unknown";
            if (otherToken) {
              ticker = otherToken.metadata.symbol;
              swapQty = convertIntToFloat(
                trade.qtyOtherToken.toString(),
                otherToken.metadata.decimals
              );
              swapQtyNear = (
                (Number(swapQty) * otherToken.price_usd) /
                nearPrice
              ).toString();
              price = (
                (Number(swapQtyNear) * nearPrice) /
                Number(amount)
              ).toString();
            }
            const txnLink = (
              <div>
                <a
                  href={`https://nearblocks.io/txns/${trade.txn}`}
                  target="_blank"
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
            );
            const column: Column = {
              id: trade.id,
              time,
              type: trade.type,
              amount,
              ticker,
              for: swapQty,
              near: swapQtyNear,
              price,
              maker: trade.maker,
              txn: txnLink,
            };

            return column;
          });
          setTableColumns(tableColumnsTemp);
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
          const token = data[tokenAddress];
          if (!token) {
            throw new Error(
              `No information found for token Address ${tokenAddress}`
            );
          }
          const { name, symbol, decimals } = token.metadata;
          const priceUsd = token.price_usd;
          const tokenMetadataTemp = {
            name,
            symbol,
            decimals,
            priceUsd,
          };
          setTokenMetadata(tokenMetadataTemp);
          setAllTokensMetadata(data);
          setNearPrice(data["wrap.near"].price_usd);
          loadingData;
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (tokenMetadata !== null && allTokensMetadata !== null) {
      updateTrades(initUrl);
    }
  }, [tokenMetadata, allTokensMetadata]);

  function previousPage() {}
  function nextPage() {}

  function updateEntriesPerPage(entries: number) {
    setEntriesPerPage(entries);
    updateTrades(
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
      {tableColumns && (
        <div className="flex flex-col justify-center">
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={tableColumns}>
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
