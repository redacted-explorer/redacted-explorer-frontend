"use client";
import Transactions from "@/components/Transactions";
import Card from "@/components/ui/Card";
import CardBody from "@/components/ui/CardBody";
import CardHeader from "@/components/ui/CardHeader";
import CardRow from "@/components/ui/CardRow";
import Pill from "@/components/ui/Pill";
import { useState } from "react";
import { rows, columns } from "../data/dummy-tx.js";

export default function Home() {
  const [activeTab, setActiveTab] = useState("transactions");
  const tabs = ["Transactions", "Receipts", "Token Txns", "NFT Token Txns"];
  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardRow>Information 1</CardRow>
            <CardRow>Information 2</CardRow>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardRow>Information 1</CardRow>
            <CardRow>Information 2</CardRow>
          </CardBody>
        </Card>
      </div>
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
      <Transactions rows={rows} columns={columns} />
    </div>
  );
}
