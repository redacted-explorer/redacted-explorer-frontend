export default function Card({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="soft-shadow rounded-xl w-full min-w-[360px] font-light ring-1 ring-near-green-200 divide-y divide-near-green-200">
      {children.map((child) => child)}
    </div>
  );
}
