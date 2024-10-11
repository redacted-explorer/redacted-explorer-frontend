import TradeHistoryInfiniteTable from "@/components/tables/TradeHistoryInfiniteTable";
import TradeHistoryTable from "@/components/tables/TradeHistoryTable";
import { TradingViewChart } from "@/components/ui/TradingViewChart";

export default function Page({ params }: { params: { address: string } }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <TradingViewChart symbol={params.address} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <TradeHistoryTable tokenAddress={params.address}></TradeHistoryTable>
      </div>
    </div>
  );
}
