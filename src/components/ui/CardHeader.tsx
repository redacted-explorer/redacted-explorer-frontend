export default function CardHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-xl px-2 py-4 font-normal">{children}</div>;
}
