"use client";

import FtTransferTableNew from "@/components/tables/FtTransferTableNew";
import TradeHistoryTable from "@/components/tables/TradeHistoryTable";
import Pill from "@/components/ui/Pill";
import { TradingViewChart } from "@/components/ui/TradingViewChart";
import { useState } from "react";

const tabs = ["Transactions", "Trade History"];

export default function Page({ params }: { params: { address: string } }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col justify-center items-stretch w-[80%]">
        <div className="flex justify-center">
          <TradingViewChart symbol={params.address} />
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
          <FtTransferTableNew contractId={params.address} />
        )}
        {activeTab === "Trade History" && (
          <TradeHistoryTable tokenAddress={params.address}></TradeHistoryTable>
        )}
      </div>
    </div>
  );
}
