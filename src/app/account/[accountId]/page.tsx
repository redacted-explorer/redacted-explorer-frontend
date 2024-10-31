"use client";
import FtTransferTable from "@/components/tables/FtTransferTable";
import TransactionsTable from "@/components/tables/TransactionsTable";
import Pill from "@/components/ui/Pill";
import { useState } from "react";

const tabs = ["Transactions", "Token Txns"];

export default function Page({ params }: { params: { accountId: string } }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <div className="mt-8 mb-4 flex flex-wrap gap-2">
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
          <TransactionsTable signerId={params.accountId} />
        )}
        {activeTab === "Token Txns" && (
          <FtTransferTable accountId={params.accountId} />
        )}
      </div>
    </div>
  );
}
