import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { TokenData } from "@/utils";
import { formatNumber } from "chart.js/helpers";
import TokenInfo from "./TokenInfo";

const FIVE_MINUTES = 1000 * 60 * 5;
const ONE_HOUR = 1000 * 60 * 60;
const SIX_HOURS = 1000 * 60 * 60 * 6;
const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
const USDT_DECIMALS = 6;

export type PriceData = {
  price_usd: string;
  timestamp_nanosec: string;
  token: string;
};

export default function TokenOverview({ tokenId }: { tokenId: string }) {
  const [tokenData, setTokenData] = useState({
    name: "loading",
    symbol: "loading",
    priceNear: "loading",
    priceUsd: "loading",
    circulatingSupply: "loading",
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

  async function updateHistoricalPrices() {
    const tokenInfo: TokenData | undefined = await getTokenInfo();
    if (tokenInfo === undefined) return;
    const currentPrice = tokenInfo.price_usd;
    const tokenDecimals = tokenInfo.metadata.decimals;

    const timestamp = Date.now();
    const times = [FIVE_MINUTES, ONE_HOUR, SIX_HOURS, ONE_DAY, ONE_WEEK];

    const timestamps = times.map((time) => timestamp - time);
    const urls = timestamps.map(
      (stamp) =>
        `https://events.intear.tech/query/price_token?token=${tokenId}&pagination_by=BeforeTimestamp&timestamp_nanosec=${
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
        "https://prices.intear.tech/price?token_id=wrap.near",
        { method: "GET" }
      );
      return await result.json();
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async function getTokenInfo() {
    try {
      const result = await fetch(
        `https://prices.intear.tech/token?token_id=${tokenId}`,
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
      await updateHistoricalPrices();
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
        const circulatingSupply =
          Number(tokenInfo.circulating_supply) *
          10 ** (-1 * Number(tokenInfo.metadata.decimals));
        setTokenData((prev) => ({
          ...prev,
          name,
          symbol,
          priceUsd,
          priceNear,
          circulatingSupply: circulatingSupply.toFixed(0),
        }));
      }
    };
    initData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateHistoricalPrices();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-2">
      <TokenInfo
        name={tokenData.name}
        ticker={tokenData.symbol}
        priceChanges={{
          fiveMinutes: priceChanges.priceChange5m,
          oneHour: priceChanges.priceChange1h,
          sixHours: priceChanges.priceChange6h,
          twentyFourHours: priceChanges.priceChange24h,
          sevenDays: priceChanges.priceChange7d,
        }}
        currentPriceUsd={tokenData.priceUsd}
        currentPriceNear={tokenData.priceNear}
        circulatingSupply={tokenData.circulatingSupply}
      />
    </div>
  );
}
