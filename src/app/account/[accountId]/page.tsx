import FtTransferTable from "@/components/tables/FtTransferTable";

export default function Page({ params }: { params: { accountId: string } }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <FtTransferTable accountId={params.accountId} />
    </div>
  );
}
