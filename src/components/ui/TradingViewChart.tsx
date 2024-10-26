"use client";

import {
  Bar,
  ChartingLibraryWidgetOptions,
  IBasicDataFeed,
  ResolutionString,
  SearchSymbolResultItem,
  widget,
} from "@/public/charting_library/charting_library";
import { useEffect, useRef } from "react";

export const TradingViewChart = ({ symbol }: { symbol: string }) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const timezone =
      {
        "-780": "Pacific/Fakaofo",
        "-765": "Pacific/Chatham",
        "-720": "Pacific/Auckland",
        "-660": "Pacific/Norfolk",
        "-540": "Asia/Seoul",
        "-600": "Australia/Brisbane",
        "-570": "Australia/Adelaide",
        "-480": "Asia/Chongqing",
        "-420": "Asia/Bangkok",
        "-390": "Asia/Yangon",
        "-360": "Asia/Almaty",
        "-330": "Asia/Colombo",
        "-345": "Asia/Kathmandu",
        "-300": "Asia/Ashkhabad",
        "-240": "Asia/Dubai",
        "-210": "Asia/Tehran",
        "-180": "Asia/Bahrain",
        "-120": "Africa/Cairo",
        "-60": "Africa/Casablanca",
        0: "Atlantic/Reykjavik",
        180: "America/Sao_Paulo",
        240: "America/Santiago",
        300: "America/Bogota",
        360: "America/Chicago",
        420: "US/Mountain",
        480: "America/Los_Angeles",
        540: "America/Anchorage",
        600: "Pacific/Honolulu",
      }[new Date().getTimezoneOffset().toString()] ?? "Etc/UTC"; // TODO doesn't work
    const latestBars: Record<string, Bar> = {};
    const subscribers: Record<string, { ws: WebSocket }> = {};
    const datafeed: IBasicDataFeed = {
      onReady: (callback) => {
        console.log("Loading TradingView");
        setTimeout(() =>
          callback({
            supports_marks: true,
            supports_timescale_marks: true,
            supports_time: true,
            supported_resolutions: [
              "1" as ResolutionString,
              "5" as ResolutionString,
              "15" as ResolutionString,
              "60" as ResolutionString,
              "4h" as ResolutionString,
              "D" as ResolutionString,
              "W" as ResolutionString,
            ],
          })
        );
      },
      searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
      ) => {
        console.log(`Searching ${userInput}`);
        const results: { account_id: string }[] = await fetch(
          `https://prices.intear.tech/token-search?q=${encodeURIComponent(
            userInput
          )}&n=20`
        ).then((res) => res.json());
        const symbols: Promise<SearchSymbolResultItem>[] = results.map(
          async (result) => {
            const metadata = await getMetadata(result.account_id);
            const icon = metadata.icon;
            return {
              description: metadata.name,
              exchange,
              symbol: metadata.symbol,
              ticker: result.account_id,
              timezone,
              logo_urls: icon ? ([icon] as [string]) : undefined,
              type: "crypto",
            };
          }
        );
        const readySymbols = await Promise.all(symbols);
        onResultReadyCallback(readySymbols);
      },
      resolveSymbol: async (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
        extension
      ) => {
        console.log(`Loading ${symbolName}`);
        const metadata = await getMetadata(symbolName);
        const price = await fetch(
          `https://prices.intear.tech/price?token_id=${symbolName}`
        ).then((data) => data.json());
        const digits = Math.ceil(Math.max(0, -Math.log10(price))) + 3;
        onSymbolResolvedCallback({
          ticker: symbolName,
          name: metadata.name,
          description: `${metadata.symbol}/USD`,
          type: "crypto",
          session: "24x7",
          timezone: "Etc/UTC",
          exchange: "Intear",
          minmov: 1,
          pricescale: 10 ** digits,
          has_intraday: true,
          intraday_multipliers: ["1", "60"],
          has_daily: true,
          daily_multipliers: ["1"],
          has_empty_bars: true,
          has_weekly_and_monthly: false,
          visible_plots_set: "ohlc",
          volume_precision: 2,
          data_status: "streaming",
          logo_urls: metadata.icon ? ([metadata.icon] as [string]) : undefined,
          listed_exchange: "Intear",
          format: "price",
        });
      },
      getBars: async (
        symbolInfo,
        resolution,
        periodParams,
        onHistoryCallback,
        onErrorCallback
      ) => {
        console.log(
          `Getting bars for ${symbolInfo.name} ${resolution} ${
            periodParams.countBack
          } ${periodParams.to * 1000}`
        );
        const url = `https://events.intear.tech/api/ohlc?token=${symbolInfo.ticker!}&resolution=${resolution}&count_back=${
          periodParams.countBack
        }&to=${periodParams.to * 1000}`;
        const response: {
          open: string;
          high: string;
          low: string;
          close: string;
          time: number;
        }[] = await fetch(url).then((data) => data.json());
        const noData = response.length < periodParams.countBack;
        const decimals = (await getMetadata(symbolInfo.ticker!)).decimals;
        const USDT_DECIMALS = 6;
        const bars = response.map((bar) => {
          return {
            open: parseFloat(bar.open) * 10 ** (decimals - USDT_DECIMALS),
            close: parseFloat(bar.close) * 10 ** (decimals - USDT_DECIMALS),
            high: parseFloat(bar.high) * 10 ** (decimals - USDT_DECIMALS),
            low: parseFloat(bar.low) * 10 ** (decimals - USDT_DECIMALS),
            time: bar.time,
          };
        });
        if (!latestBars[symbolInfo.ticker + "/" + resolution]) {
          latestBars[symbolInfo.ticker + "/" + resolution] =
            bars[bars.length - 1];
        }
        onHistoryCallback(bars, { noData });
      },
      subscribeBars: async (
        symbolInfo,
        resolution,
        onTick,
        listenerGuid,
        onResetCacheNeededCallback
      ) => {
        console.log(`Subscribing to bars of ${symbolInfo.ticker}`);
        const decimals = (await getMetadata(symbolInfo.ticker!)).decimals;
        const USDT_DECIMALS = 6;
        const ws = new WebSocket(
          "wss://ws-events.intear.tech/events/price_token"
        );
        subscribers[listenerGuid] = { ws };
        ws.onopen = () => {
          ws.send(JSON.stringify({ token: symbolInfo.ticker! }));
        };
        ws.onmessage = (e) => {
          const data = JSON.parse(e.data);
          const time = parseInt(data.timestamp_nanosec) / 1_000_000;
          let barTime;
          switch (resolution) {
            case "1":
              barTime = 1 * 60 * 1000;
              break;
            case "5":
              barTime = 5 * 60 * 1000;
              break;
            case "15":
              barTime = 15 * 60 * 1000;
              break;
            case "60":
              barTime = 60 * 60 * 1000;
              break;
            case "240":
              barTime = 240 * 60 * 1000;
              break;
            case "1D":
              barTime = 24 * 60 * 60 * 1000;
              break;
            case "1W":
              barTime = 7 * 24 * 60 * 1000;
              break;
            default:
              throw new Error(`Unexpected resolution ${resolution}`);
          }
          const nextBarTime =
            latestBars[symbolInfo.ticker + "/" + resolution].time + barTime;
          const tradePrice =
            parseFloat(data.price_usd) * 10 ** (decimals - USDT_DECIMALS);
          if (time > nextBarTime) {
            latestBars[symbolInfo.ticker + "/" + resolution] = {
              high: tradePrice,
              low: tradePrice,
              open: latestBars[symbolInfo.ticker + "/" + resolution].close,
              close: tradePrice,
              time: nextBarTime,
            };
          } else {
            latestBars[symbolInfo.ticker + "/" + resolution] = {
              ...latestBars[symbolInfo.ticker + "/" + resolution],
              high: Math.max(
                latestBars[symbolInfo.ticker + "/" + resolution].high,
                tradePrice
              ),
              low: Math.min(
                latestBars[symbolInfo.ticker + "/" + resolution].low,
                tradePrice
              ),
              close: tradePrice,
            };
          }
          onTick(latestBars[symbolInfo.ticker + "/" + resolution]);
        };
      },
      unsubscribeBars: async (listenerGuid) => {
        console.log(`Unsubscribing from bars: ${listenerGuid}`);
        subscribers[listenerGuid].ws.close();
      },
    };
    const widgetOptions: ChartingLibraryWidgetOptions = {
      datafeed,
      library_path: "https://dynamic-moxie-09a484.netlify.app/",
      fullscreen: true,
      symbol,
      interval: "5" as ResolutionString, // TODO save selected
      container: chartContainerRef.current,
      locale: "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["show_symbol_logos", "custom_resolutions"],
      theme: "dark",
      custom_themes: {
        light: {
          color1: [
            "#f5ebff",
            "#ead6fe",
            "#e0c2fe",
            "#d5adfe",
            "#cb99fd",
            "#c184fd",
            "#b670fd",
            "#ac5bfc",
            "#a147fc",
            "#9732fc",
            "#8209fb",
            "#7708e6",
            "#6c08d1",
            "#6207bc",
            "#5706a7",
            "#4c0592",
            "#41057e",
            "#360469",
            "#2b0354",
          ],
          color2: [
            "#f2edf7",
            "#e6dcef",
            "#d9cae7",
            "#ccb9df",
            "#bfa7d7",
            "#b396d0",
            "#a684c8",
            "#9972c0",
            "#8c61b8",
            "#804fb0",
            "#662ca0",
            "#5e2893",
            "#552585",
            "#4d2178",
            "#441d6b",
            "#3c1a5d",
            "#331650",
            "#2b1243",
            "#220f35",
          ],
          color3: [
            "#fff0f0",
            "#ffe1e1",
            "#ffd3d3",
            "#ffc4c4",
            "#ffb5b5",
            "#ffa6a6",
            "#ff9797",
            "#ff8888",
            "#ff7a7a",
            "#ff6b6b",
            "#ff4d4d",
            "#ea4747",
            "#d54040",
            "#bf3a3a",
            "#aa3333",
            "#952d2d",
            "#802727",
            "#6a2020",
            "#551a1a",
          ],
          color4: [
            "#f2fdf8",
            "#e5faf0",
            "#d7f8e9",
            "#caf5e1",
            "#bdf3da",
            "#b0f1d2",
            "#a2eecb",
            "#95ecc3",
            "#88e9bc",
            "#7be7b4",
            "#60e2a5",
            "#58cf97",
            "#50bc8a",
            "#48aa7c",
            "#40976e",
            "#388460",
            "#307153",
            "#285e45",
            "#204b37",
          ],
          color5: [
            "#fef5ea",
            "#fdecd5",
            "#fbe2bf",
            "#fad9aa",
            "#f9cf95",
            "#f8c680",
            "#f6bc6a",
            "#f5b255",
            "#f4a940",
            "#f39f2b",
            "#f08c00",
            "#dc8000",
            "#c87500",
            "#b46900",
            "#a05d00",
            "#8c5200",
            "#784600",
            "#643a00",
            "#502f00",
          ],
          color6: [
            "#feeafe",
            "#fcd5fc",
            "#fbbffb",
            "#f9aaf9",
            "#f895f8",
            "#f780f7",
            "#f56af5",
            "#f455f4",
            "#f240f2",
            "#f12bf1",
            "#ee00ee",
            "#da00da",
            "#c600c6",
            "#b300b3",
            "#9f009f",
            "#8b008b",
            "#770077",
            "#630063",
            "#4f004f",
          ],
          color7: [
            "#fefeea",
            "#fcfcd5",
            "#fbfbbf",
            "#f9f9aa",
            "#f8f895",
            "#f7f780",
            "#f5f56a",
            "#f4f455",
            "#f2f240",
            "#f1f12b",
            "#eeee00",
            "#dada00",
            "#c6c600",
            "#b3b300",
            "#9f9f00",
            "#8b8b00",
            "#777700",
            "#636300",
            "#4f4f00",
          ],
          white: "#f2e6ff",
          black: "#421b50",
        },
        dark: {
          color1: [
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#076041",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
          ],
          color2: [
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#00ec97",
            "#eeeeee",
            "#dddddd",
            "#cccccc",
            "#bbbbbb",
            "#aaaaaa",
            "#999999",
            "#888888",
            "#777777",
            "#666666",
            "#555555",
            "#444444",
            "#333333",
            "#222222",
            "#000000",
            "#111111",
          ],
          color3: [
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
            "#f85151",
          ],
          color4: [
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
          ],
          color5: [
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
          ],
          color6: [
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
          ],
          color7: [
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
            "#00ec97",
          ],
          white: "#ffffff",
          black: "#000000",
        },
      },
    };

    const tvWidget = new widget(widgetOptions);

    return () => {
      tvWidget.remove();
    };
  }, [symbol]);

  return <div className="w-full" ref={chartContainerRef} />;
};

// TODO I guess this can be moved up to the token page, when the header is done
async function getMetadata(
  account_id: string
): Promise<{
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  spec: string;
  reference: string | null;
  reference_hash: string | null;
}> {
  console.log(`Getting ${account_id}`);
  if (account_id === "wrap.near") {
    return {
      name: "NEAR",
      symbol: "NEAR",
      decimals: 24,
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTA4MCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMDBFQzk3Ii8+CjxwYXRoIGQ9Ik03NzMuNDI1IDI0My4zOEM3NTEuNDUzIDI0My4zOCA3MzEuMDU0IDI1NC43NzIgNzE5LjU0NCAyNzMuNDk5TDU5NS41MzggNDU3LjYwNkM1OTEuNDk5IDQ2My42NzMgNTkzLjEzOCA0NzEuODU0IDU5OS4yMDYgNDc1Ljg5M0M2MDQuMTI0IDQ3OS4xNzIgNjEwLjYzMSA0NzguNzY2IDYxNS4xMSA0NzQuOTEzTDczNy4xNzIgMzY5LjA0MkM3MzkuMiAzNjcuMjE3IDc0Mi4zMjcgMzY3LjQwMyA3NDQuMTUyIDM2OS40MzFDNzQ0Ljk4IDM3MC4zNjEgNzQ1LjQyIDM3MS41NjEgNzQ1LjQyIDM3Mi43OTRWNzA0LjI2NUM3NDUuNDIgNzA3LjAwMyA3NDMuMjA2IDcwOS4yIDc0MC40NjggNzA5LjJDNzM4Ljk5NyA3MDkuMiA3MzcuNjExIDcwOC41NTggNzM2LjY4MiA3MDcuNDI1TDM2Ny43MDcgMjY1Ljc1OEMzNTUuNjkgMjUxLjU3NyAzMzguMDQ1IDI0My4zOTcgMzE5LjQ3IDI0My4zOEgzMDYuNTc1QzI3MS42NzMgMjQzLjM4IDI0My4zOCAyNzEuNjczIDI0My4zOCAzMDYuNTc1Vjc3My40MjVDMjQzLjM4IDgwOC4zMjcgMjcxLjY3MyA4MzYuNjIgMzA2LjU3NSA4MzYuNjJDMzI4LjU0NiA4MzYuNjIgMzQ4Ljk0NiA4MjUuMjI4IDM2MC40NTYgODA2LjUwMUw0ODQuNDYyIDYyMi4zOTRDNDg4LjUwMSA2MTYuMzI3IDQ4Ni44NjIgNjA4LjE0NiA0ODAuNzk0IDYwNC4xMDdDNDc1Ljg3NiA2MDAuODI4IDQ2OS4zNjkgNjAxLjIzNCA0NjQuODkgNjA1LjA4N0wzNDIuODI4IDcxMC45NThDMzQwLjggNzEyLjc4MyAzMzcuNjczIDcxMi41OTcgMzM1Ljg0OCA3MTAuNTY5QzMzNS4wMiA3MDkuNjM5IDMzNC41OCA3MDguNDM5IDMzNC41OTcgNzA3LjIwNlYzNzUuNjUxQzMzNC41OTcgMzcyLjkxMyAzMzYuODExIDM3MC43MTUgMzM5LjU0OSAzNzAuNzE1QzM0MS4wMDMgMzcwLjcxNSAzNDIuNDA2IDM3MS4zNTggMzQzLjMzNSAzNzIuNDlMNzEyLjI1OSA4MTQuMjQyQzcyNC4yNzYgODI4LjQyMyA3NDEuOTIxIDgzNi42MDMgNzYwLjQ5NiA4MzYuNjJINzczLjM5MkM4MDguMjkzIDgzNi42MzcgODM2LjYwMyA4MDguMzYxIDgzNi42MzcgNzczLjQ1OVYzMDYuNTc1QzgzNi42MzcgMjcxLjY3MyA4MDguMzQ0IDI0My4zOCA3NzMuNDQyIDI0My4zOEg3NzMuNDI1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==",
      spec: "ft-1.0.0",
      reference: null,
      reference_hash: null,
    };
  }
  const tokens = JSON.parse(localStorage.getItem("tokenMeta") ?? "{}") ?? {};
  if (tokens[account_id]) {
    return tokens[account_id];
  }
  tokens[account_id] = await fetch("https://beta.rpc.mainnet.near.org/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "dontcare",
      jsonrpc: "2.0",
      method: "query",
      params: {
        request_type: "call_function",
        account_id: account_id,
        method_name: "ft_metadata",
        args_base64: btoa(JSON.stringify({})),
        finality: "final",
      },
    }),
  })
    .then((data) => data.json())
    .then((data) =>
      new TextDecoder().decode(Uint8Array.from(data.result.result))
    )
    .then((data) => JSON.parse(data));
  localStorage.setItem("tokenMeta", JSON.stringify(tokens));
  return tokens[account_id];
}
