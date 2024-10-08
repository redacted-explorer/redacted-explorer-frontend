export default function CardBody({
  children,
}: {
  children: React.ReactNode[];
}) {
  return <div className="px-2 divide-y divide-near-green-200">{children}</div>;
}
