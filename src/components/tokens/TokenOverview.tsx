import { useEffect, useState } from "react";
import { PriceData, TokenData } from "../../../types";
import { Button } from "@nextui-org/button";

const addressNear = "wrap.near";
const FIVE_MINUTES = 1000 * 60 * 5;
const ONE_HOUR = 1000 * 60 * 60;
const SIX_HOURS = 1000 * 60 * 60 * 6;
const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
const USDT_DECIMALS = 6;

export default function TokenOverview({
  tokenAddress,
}: {
  tokenAddress: string;
}) {
  const [tokenData, setTokenData] = useState({
    name: "loading",
    symbol: "loading",
    priceNear: "loading",
    priceUsd: "loading",
  });
  const [priceChanges, setPriceChanges] = useState({
    priceChange5m: "loading",
    priceChange1h: "loading",
    priceChange6h: "loading",
    priceChange24h: "loading",
    priceChange7d: "loading",
  });
  const priceChangeObjectKeys = [
    "priceChange5m",
    "priceChange1h",
    "priceChange6h",
    "priceChange24h",
    "priceChange7d",
  ];

  async function getHistoricalPrices() {
    const tokenInfo: TokenData | undefined = await getTokenInfo();
    if (tokenInfo === undefined) return;
    const currentPrice = tokenInfo.price_usd;
    const tokenDecimals = tokenInfo.metadata.decimals;

    const timestamp = Date.now();
    const times = [FIVE_MINUTES, ONE_HOUR, SIX_HOURS, ONE_DAY, ONE_WEEK];

    const timestamps = times.map((time) => timestamp - time);
    const urls = timestamps.map(
      (stamp) =>
        `https://events.intear.tech/query/price_token?token=${tokenAddress}&pagination_by=BeforeTimestamp&timestamp_nanosec=${
          stamp * 1000000
        }&limit=1`
    );
    const promises = urls.map((url) => fetch(url));
    Promise.all(promises)
      .then((response) => {
        const data = response.map((r) => r.json());
        return Promise.all(data);
      })
      .then((data) => {
        const prices: number[] = data.map(
          (date: { event: PriceData; id: number }[]) =>
            (parseFloat(date[0].event.price_usd) * 10 ** tokenDecimals) /
            10 ** USDT_DECIMALS
        );

        const priceChanges = prices.map((price) => {
          return Number(price) / Number(currentPrice);
        });

        const priceChangePercentages = priceChanges.map(
          (change) => `${((change - 1) * 100).toFixed(2)}%`
        );

        priceChangePercentages.forEach((percentage, index) => {
          setPriceChanges((prev) => ({
            ...prev,
            [priceChangeObjectKeys[index]]: percentage,
          }));
        });
      });
  }

  async function getNearPrice() {
    try {
      const result = await fetch(
        "https://prices.intear.tech/get-token-price?token_id=wrap.near",
        { method: "GET" }
      );
      const data: { price: number } = await result.json();
      return data.price;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async function getTokenInfo() {
    try {
      const result = await fetch(
        `https://prices.intear.tech/token?token_id=${tokenAddress}`,
        { method: "GET" }
      );
      const data: TokenData = await result.json();
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  useEffect(() => {
    const initData = async () => {
      await getHistoricalPrices();
      const nearPrice: number | undefined = await getNearPrice();
      const tokenInfo: TokenData | undefined = await getTokenInfo();

      if (tokenInfo !== undefined) {
        const { name, symbol } = tokenInfo.metadata;
        const priceUsd = tokenInfo.price_usd;
        console.log(priceUsd);
        console.log(nearPrice);
        const priceNear =
          nearPrice !== undefined
            ? (Number(priceUsd) / nearPrice).toString()
            : "No Data";
        setTokenData((prev) => ({
          ...prev,
          name,
          symbol,
          priceUsd,
          priceNear,
        }));
      }
    };
    initData();
  }, []);

  return (
    <div className="my-2">
      <Button onClick={getHistoricalPrices}>Date</Button>
      <div>{tokenAddress}</div>
      <div>Token Name: {tokenData.name}</div>
      <div>Token Ticker: {tokenData.symbol}</div>
      <div>Current Price (NEAR): {tokenData.priceNear}</div>
      <div>Current Price (USD): {tokenData.priceUsd}</div>
      <h3>Price Change</h3>
      <div>5min - {priceChanges.priceChange5m}</div>
      <div>1h - {priceChanges.priceChange1h}</div>
      <div>6h - {priceChanges.priceChange6h}</div>
      <div>24h - {priceChanges.priceChange24h}</div>
      <div>7d - {priceChanges.priceChange7d}</div>
    </div>
  );
}
