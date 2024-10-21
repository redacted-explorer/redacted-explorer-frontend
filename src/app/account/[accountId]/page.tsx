import FtTransferTable from "@/components/tables/FtTransferTable";
import FtTransferTableNew from "@/components/tables/FtTransferTableNew";

export default function Page({ params }: { params: { accountId: string } }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <FtTransferTableNew accountId={params.accountId} />
      {/*       <FtTransferTable accountId={params.accountId} />
       */}{" "}
    </div>
  );
}
