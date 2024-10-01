export default function HeaderMenuItem({
  url = "",
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <button className="flex justify-between py-2 hover:text-slate-500 w-full">
      {children}
    </button>
  );
}
