"use client";
import AllTokensTradeHistoryTable from "@/components/tables/AllTokensTradeHistoryTable";
import BlockInfoTable from "@/components/tables/BlockInfoTable";
// import TpsChart from "@/components/ui/TpsChart";

export default function Home() {
  return (
    <div className="grid grid-rows-7 grid-flow-col gap-8 p-4 h-[100vh]">
      <div className="row-span-3 h-full w-full bg-white">
        <iframe src="https://tps.intear.tech/" className="w-full h-full" />
      </div>
      <div className="row-span-4">
        <BlockInfoTable entriesPerPage={8} />
      </div>
      <div className="row-span-3">
        <AllTokensTradeHistoryTable />
      </div>
    </div>
  );
}
