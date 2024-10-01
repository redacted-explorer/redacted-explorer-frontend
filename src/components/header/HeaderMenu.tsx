export default function HeaderMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-sm font-light mt-2">{children}</div>;
}
