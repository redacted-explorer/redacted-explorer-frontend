import TradeHistoryTable from "@/components/tables/TradeHistoryTable";

export default function Page({ params }: { params: { address: string } }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <TradeHistoryTable tokenAddress={params.address}></TradeHistoryTable>
    </div>
  );
}
