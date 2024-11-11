"use client";

import FtTransferTable from "@/components/tables/FtTransferTable";
import TradeHistoryTable from "@/components/tables/TradeHistoryTable";
import TokenOverview from "@/components/tokens/TokenOverview";
// import TokenTradeWidget from "@/components/TokenTradeWidget";
import Pill from "@/components/ui/Pill";
import { TradingViewChart } from "@/components/ui/TradingViewChart";
import { useState } from "react";

const tabs = ["Transactions", "Trade History"];

export default function Page({ params }: { params: { tokenId: string } }) {
  if (params.tokenId === "near") {
    params.tokenId = "wrap.near";
  }
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-stretch w-full">
        <div className="max-h-[700px] grid grid-cols-3 gap-4">
          <div className="col-span-2 row-span-2">
            <div className="flex justify-center ">
              <TradingViewChart symbol={params.tokenId} />
            </div>
          </div>
          <div className="flex justify-end items-end ">
            <TokenOverview tokenId={params.tokenId} />
          </div>
          <div className="flex justify-end items-end">
            {/* <TokenTradeWidget tokenId={params.tokenId} /> */}
          </div>
        </div>

        <div className="mt-8 mb-4 flex flex-wrap gap-2 w-full">
          {tabs.map((tab) => (
            <Pill
              key={tab}
              active={activeTab === tab ? true : false}
              setActive={() => {
                setActiveTab(tab);
              }}
            >
              {tab}
            </Pill>
          ))}
        </div>
        {activeTab === "Transactions" && (
          <FtTransferTable tokenId={params.tokenId} />
        )}
        {activeTab === "Trade History" && (
          <TradeHistoryTable tokenId={params.tokenId}></TradeHistoryTable>
        )}
      </div>
    </div>
  );
}
