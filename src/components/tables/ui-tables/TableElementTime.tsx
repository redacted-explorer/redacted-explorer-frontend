import { TimeAgo } from "@/components/ui/TimeAgo";

export default function TableElementTime({
  timestampNanosec,
}: {
  timestampNanosec: number;
}) {
  return <div className="min-w-[6rem]"><TimeAgo timestampNanosec={timestampNanosec} /></div>;
}
