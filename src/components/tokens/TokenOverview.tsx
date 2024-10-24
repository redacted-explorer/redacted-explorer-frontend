import { useEffect, useState } from "react";
import { TokenData } from "../../../types";

const addressNear = "wrap.near";

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
  const [historicalPrices, setHistoricalPrices] = useState({
    priceChange5m: "loading",
    priceChange1h: "loading",
    priceChange6h: "loading",
    priceChange24h: "loading",
    priceChange7d: "loading",
  });

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
      <div>{tokenAddress}</div>
      <div>Token Name: {tokenData.name}</div>
      <div>Token Ticker: {tokenData.symbol}</div>
      <div>Current Price (NEAR): {tokenData.priceNear}</div>
      <div>Current Price (USD): {tokenData.priceUsd}</div>
      <h3>Price Change</h3>
      <div>5min - {}</div>
      <div>1h - {}</div>
      <div>6h - {}</div>
      <div>24h - {}</div>
      <div>7d - {}</div>
    </div>
  );
}
